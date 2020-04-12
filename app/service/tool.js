'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md = require('md5');

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
}

module.exports = ToolService;
