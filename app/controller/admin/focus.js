'use strict';

const fs = require('fs');
const pump = require('mz-modules/pump');

// const Controller = require('egg').Controller;
const BaseController = require('./base.js');

class FocusController extends BaseController {
  async index() {
    let list = await this.ctx.model.Focus.find();
    // console.log(list)
    await this.ctx.render('admin/focus/index', {list})
  }

  async add() {
    await this.ctx.render('admin/focus/add');
  }

  async doAdd() {
    let parts = this.ctx.multipart({autoFields: true});
    let files = {};
    let stream; 
    while( (stream = await parts()) != null) {
      if( !stream.filename ) {
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

    // 保存
    let focus = new this.ctx.model.Focus(Object.assign(files, parts.field))
    await focus.save();

    await this.success('/admin/focus', '增加轮播图成功');
  }

  async edit() {
    let id = this.ctx.request.query.id;
    let detail = await this.ctx.model.Focus.find({'_id': id});
    // console.log(detail)
    await this.ctx.render('admin/focus/edit', {
      detail: detail[0],
    });
  }

  async doEdit() {
    let parts = this.ctx.multipart({autoFields: true});
    let files = {};
    let stream;
    while( (stream = await parts()) != null) {
      if( !stream.filename ) {
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

    let id = parts.field._id;
    let data = Object.assign(files, parts.field);
    // delete data._id 

    await this.ctx.model.Focus.updateOne({'_id': id}, data);

    await this.success('/admin/focus', '修改轮播图成功');
  }
}

module.exports = FocusController;
