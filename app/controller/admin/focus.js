'use strict';

const BaseController = require('../admin/base');
const fs = require('fs');
const pump = require('mz-modules/pump');

class FocusController extends BaseController {
  async index() {
    const { ctx } = this;
    let list = await ctx.model.Focus.find();

    await ctx.render('admin/focus/index', {
      list,
    });
  }

  async add() {
    const { ctx } = this;
    await ctx.render('admin/focus/add');
  }

  async doAdd() {
    const { ctx } = this;
    // autoFields: true 拿到出文件之外的参数
    let parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; // file表单的名字
      let dir = await this.service.tool.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });
    }

    let focus = new this.ctx.model.Focus(Object.assign(files, parts.field));
    let result = await focus.save();

    await this.success('/admin/focus', '增加轮播图成功');
  }

  async edit() {
    const { ctx } = this;
    let id = ctx.request.query.id;
    let result = await ctx.model.Focus.findById(id);

    await ctx.render('admin/focus/edit', {
      list: result,
    });
  }

  async doEdit() {
    const { ctx } = this;
    let parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; // file表单的名字
      let dir = await this.service.tool.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });
    }

    let id = parts.field.id;
    let updateResult = Object.assign(files, parts.field);
    let result = await this.ctx.model.Focus.updateOne({"_id":id}, updateResult);

    await this.success('/admin/focus', '修改轮播图成功');
  }
}

module.exports = FocusController;
