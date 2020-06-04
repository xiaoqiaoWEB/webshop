'use strict';

const BaseController = require('./base');

class GoodsController extends BaseController {
  async index() {
    this.ctx.body = 'goods';
  }
}

module.exports = GoodsController;
