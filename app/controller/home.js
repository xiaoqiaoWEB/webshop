'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let csrf = await ctx.service.tool.md5('123456')
    ctx.body = {
      msg: csrf,
    };
  }
}

module.exports = HomeController;
