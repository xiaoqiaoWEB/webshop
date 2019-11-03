'use strict';
const fs = require('fs');
const pump = require('mz-modules/pump');

const BaseController = require('./base.js');

class GoodsCateController extends BaseController {
  async index() {
    let result = await this.ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'item',    
        },
      },
      {
        $match: {
          "pid": '0',
        },
      },
    ]);
    
    // console.log(JSON.stringify(result))
    await this.ctx.render('admin/goodsCate/index', {
      list: result,
    });
  }

  async add() {
    let result = await this.ctx.model.GoodsCate.find({'pid': '0'});
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

      // 生成缩略图
      this.service.tools.jimpImg(target);
    }
  
    if (parts.field.pid != 0) {    
      parts.field.pid=this.app.mongoose.Types.ObjectId(parts.field.pid);    // 调用mongoose里面的方法把字符串转换成ObjectId 
    }

    let saveData = new this.ctx.model.GoodsCate(Object.assign(files, parts.field));
    await saveData.save();
    await this.success('/admin/goodsCate', '增加商品分类成功！');
  }

  async edit() {
    let id = this.ctx.request.query.id;
    let catelist = await this.ctx.model.GoodsCate.find({'pid': '0'});
    let result = await this.ctx.model.GoodsCate.find({"_id": id});
    // console.log(result)
    await this.ctx.render('admin/goodsCate/edit', {
      cateList: catelist,
      data: result[0],
    });
  }

  async doEdit() {
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

      // 生成缩略图
      this.service.tools.jimpImg(target);
    }
    if (parts.field.pid != 0) {    
      parts.field.pid=this.app.mongoose.Types.ObjectId(parts.field.pid);    // 调用mongoose里面的方法把字符串转换成ObjectId 
    }

    let upData = Object.assign(files, parts.field);
    let _id = parts.field._id;
    await this.ctx.model.GoodsCate.updateOne({"_id": _id}, upData);
    await this.success('/admin/goodsCate', '增加分类成功');
  }  
}

module.exports = GoodsCateController;
