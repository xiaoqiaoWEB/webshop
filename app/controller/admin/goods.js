'use strict';

const BaseController = require('./base');
const fs = require('fs');
const pump = require('mz-modules/pump');

class GoodsController extends BaseController {
  async index() {
    let { ctx } = this;
    let result = await ctx.model.Goods.find({});
    await ctx.render('admin/goods/index', {
      list: result,
    });
  }

  async add() {
    this.ctx.body = 'add';
  }

  async doAdd() {
    this.ctx.body = 'doadd';
  }
}

module.exports = GoodsController;
