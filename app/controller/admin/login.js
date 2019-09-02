'use strict';

var BaseController = require('./base.js');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login')
  }

  async doLogin() {
    // 01 判断验证码
    // 02 密码加密
    // 03 数据库查询 用户名
    let {
      _csrf,
      username,
      password,
      verify
    } = this.ctx.request.body;

    // 密码加密
    password = await this.service.tools.md5(password);

    // 判断登录是否成功
    if (verify == this.ctx.session.code) {
      let result = await this.ctx.model.Admin.find({username, password});
      if(result.length > 0) {
        // 登录成功 
        // 保存用户信息
        this.ctx.session.userInfo = result[0];
        this.ctx.redirect('/admin');
      } else {
        await this.error('/admin/login','用户名或者密码不对');
      }
    } else {
      // 验证码不正确
      await this.error('/admin/login', '验证码不正确！')
    }
  }

  async loginOut() {
    this.ctx.session = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;