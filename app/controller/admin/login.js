'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { name, password } = ctx.request.body;
    // const name = '123';
    // const password = '123';
    const token = app.jwt.sign({ name }, app.config.jwt.secret);

    ctx.body = { token };
  }

  async user() {
    const { ctx, app } = this;

    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }
}

module.exports = LoginController;
