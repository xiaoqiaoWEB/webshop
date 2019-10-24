'use strict';

const BaseController = require('./base.js');

class GoodsCateController extends BaseController {
  async index() {
    await this.ctx.render('admin/goodsCate/index');
  }

  async add() {
    await this.ctx.render('admin/goodsCate/add');
  }

  async edit() {
    await this.ctx.render('admin/goodsCate/edit');
  }
  
}

module.exports = GoodsCateController;
