'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  async success(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/success', {
      redirectUrl,
      message: message || '操作成功!',
    });
  }

  async error(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/error', {
      redirectUrl,
      message: message || '操作失败!',
    });
  }

  async verify() {
    const { ctx, service } = this;
    const captcha = await service.tool.getcaptcha();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = BaseController;
