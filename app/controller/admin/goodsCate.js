'use strict';
const fs = require('fs');
const pump = require('mz-modules/pump');

const BaseController = require('./base.js');

class GoodsCateController extends BaseController {
  async index() {
    await this.ctx.render('admin/goodsCate/index');
  }

  async add() {
    let result = this.ctx.model.GoodsCate.find({'pid': 0});
    await this.ctx.render('admin/goodsCate/add', {
      cateList: result,
    });
  }

  async doAdd() {
    // autoFields: true  获得上传的 除去文件之外的信息
    // 数据流  parts
    let parts = this.ctx.multipart({autoFields: true});
    let files = {};
    let stream;
    while ( (stream = await parts()) != null) {
      if ( !stream.filename ) {
        break;
      }
      let fieldname = stream.fieldname;
      // 目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream); 

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    let saveData = new this.ctx.model.GoodsCate(Object.assign(files, parts.field));
    await saveData.save();
    await this.success('/admin/goodsCate', '增加商品分类成功！');
  }

  async edit() {
    await this.ctx.render('admin/goodsCate/edit');
  }
}

module.exports = GoodsCateController;
