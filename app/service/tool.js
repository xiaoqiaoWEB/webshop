'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md = require('md5');
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');

class ToolService extends Service {
  async getcaptcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.createMathExpr({
      size: 6,
      fontSize: 42,
      width: 100,
      height: 34,
      noise: 2,
      color: 'red',
      mathMin: 1,
      mathMax: 10,
      background: '#666666',
    });
    /* 验证码上面的信息 */
    ctx.session.code = captcha.text;
    return captcha;
  }

  async md5(str) {
    return md(str);
  }

  async getTime() {
    let d = new Date();
    return d.getTime();
  }

  async getUploadFile(filename) {
    let day = sd.format(new Date(), 'YYYYMMDD');
    // console.log(day, '123')
    let dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);

    /* 毫秒数 */
    let d = await this.getTime();

    // 返回图片保存的路径
    let uploadDir = path.join(dir, d + path.extname(filename));

    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }
}

module.exports = ToolService;
