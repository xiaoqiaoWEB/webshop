'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  async success(redirectUrl) {
    const { ctx } = this;
    await ctx.render('admin/public/success', {
      redirectUrl,
    });
  }

  async error(redirectUrl) {
    const { ctx } = this;
    await ctx.render('admin/public/error', {
      redirectUrl,
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
