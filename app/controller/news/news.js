'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = {
      msg: ctx.query,
      code: 200,
      result: []
    };
  }

  async detail() {
    const { ctx } = this;
    ctx.body = {
      msg: ctx.params,
      code: 200,
      result: []
    };
  }
}

module.exports = NewsController;
