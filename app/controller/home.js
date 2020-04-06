'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let csrf = ctx.csrf;
    ctx.body = {
      msg: csrf
    };
  }
}

module.exports = HomeController;
