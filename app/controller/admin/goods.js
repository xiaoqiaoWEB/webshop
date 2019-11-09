'use strict';

const BaseController = require('./base.js');

const fs = require('fs');
const pump = require('mz-modules/pump');

class GoodsController extends BaseController {
  async index() {
    await this.ctx.render('admin/goods/index');
  }

  async add() {
    // 颜色列表
    let colorlist = await this.ctx.model.GoodsColor.find({});
    // 商品类型列表
    let typeList = await this.ctx.model.GoodsType.find({});

    await this.ctx.render('admin/goods/add', {
      colorlist,
      typeList,
    });
  }

  async getGoodsTypeAttribute() {
    let cate_id = this.ctx.request.query.cate_id;
    let list = await this.ctx.model.GoodsTypeAttribute.find({
      "cate_id": cate_id
    });
    this.ctx.body = {
      list,
    }
  }

  async goodsUploadImage() {
    //实现图片上传
    let parts = this.ctx.multipart({
      autoFields: true
    });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; //file表单的名字

      //上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      })

    }

    console.log(files);

    //图片的地址转化成 {link: 'path/to/image.jpg'} 

    this.ctx.body = {
      link: files.file
    };
  }

  async doAdd() {
    let data = this.ctx.request.body;
    console.log(data);
  }
}

module.exports = GoodsController;