'use strict';

const fs = require('fs');
const pump = require('mz-modules/pump');

//const Controller = require('egg').Controller;
var BaseController = require('./base.js');

class FocusController extends BaseController {
  async index() {
    await this.ctx.render('admin/focus/index')
  }

  async add() {
    await this.ctx.render('admin/focus/add')
  }

  async doAdd() {
    let parts = this.ctx.multipart({autoFields: true});
    let files = {};
    let stream;
    
    //console.log(await parts())

    while( (stream = await parts()) != null) {
      if( !stream.filename ) {
        break;
      }
      let fieldname = stream.fieldname;
      // 目录
      let dir=await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream); 

      files= Object.assign(files,{
        [fieldname]:dir.saveDir    
      })
    }
    console.log(Object.assign(files))
    console.log(parts.field)
  }
}

module.exports = FocusController;
