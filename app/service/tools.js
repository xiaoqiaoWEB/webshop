'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const md5 = require('md5');
var sd = require('silly-datetime');
var path=require('path');
const mkdirp = require('mz-modules/mkdirp');

class ToolsService extends Service {
  async captcha() {
    let captcha = svgCaptcha.createMathExpr({
      size:6,
      fontSize: 50, 
      width: 100, 
      height:36,
      noise: 8,
      background:"#cc9966" 
    })
    this.ctx.session.code = captcha.text;
    return captcha;
  }

  async md5(str) {
    return md5(str)
  }

  async getTime(){
    var d=new Date();
    return d.getTime();
  }

  async getUploadFile(filename) {

    // 获取当前日期
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 创建图片保存的路径
    var dir=path.join(this.config.uploadDir,day);

    await mkdirp(dir);
    
    var d = await this.getTime();   /*毫秒数*/

    // 返回图片保存的路径
    var uploadDir=path.join(dir, d + path.extname(filename));

    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }
}

module.exports = ToolsService;
