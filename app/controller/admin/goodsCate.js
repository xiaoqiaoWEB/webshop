'use strict';

const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');

class GoodsCateController extends BaseController {
  async index() {

    this.ctx.body = '商品分类';
  }
}

module.exports = GoodsCateController;
