'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async login() {
    const { ctx } = this;
    await ctx.render('admin/login');
  }

  async doLogin() {
    const { ctx } = this;
    const { username, password, code } = ctx.request.body;
    const pwd = await ctx.service.tool.md5(password);
  
    // eslint-disable-next-line eqeqeq
    if (code == ctx.session.code) {
      const auth = await ctx.model.Admin.find({ username, password: pwd });
      if (auth.length > 0) {
        ctx.session.userinfo = auth[0];
        ctx.redirect('/admin');
      } else {
        await this.error('/admin/login', '用户名或者密码不对');
      }
    } else {
      await this.error('/admin/login', '验证码错误');
    }
  }

  async loginOut() {
    const { ctx } = this;
    ctx.session.userinfo = null;
    ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
