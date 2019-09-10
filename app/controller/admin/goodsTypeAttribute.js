'use strict';

var BaseController = require('./base.js');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    let cate_id = this.ctx.request.query.id;
    await this.ctx.render('/admin/goodsTypeAttribute/index', {
      list: []
    })
  }

  async add() {
    await this.ctx.render('/admin/goodsTypeAttribute/add', {
      
    })
  }
}

module.exports = GoodsTypeAttributeController;
