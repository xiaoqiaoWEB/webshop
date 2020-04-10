'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    await ctx.render('admin/login');
  }
}

module.exports = LoginController;
