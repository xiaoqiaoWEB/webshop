'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md = require('md5');
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const Jimp = require('jimp');

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
  // 生成缩略图的公共方法
  async jimpImg(target) {
    // 上传图片成功以后生成缩略图
    Jimp.read(target, (err, lenna) => {
      if (err) throw err;
      lenna.resize(200, 200) // resize
        .quality(90) // set JPEG quality
        .write(target + '_200x200' + path.extname(target)); // save


      lenna.resize(400, 400) // resize
        .quality(90) // set JPEG quality
        .write(target + '_400x400' + path.extname(target)); // save
    });
  }
}

module.exports = ToolService;
