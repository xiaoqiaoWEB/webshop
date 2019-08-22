'use strict';

var BaseController =require('./base.js');

class MangerController extends BaseController {
  async index() {
    await this.ctx.render('admin/manger/index')
  }

  async add() {
    await this.ctx.render('admin/manger/add')
  }

  async edit() {
    await this.ctx.render('admin/manger/edit')
  }
}

module.exports = MangerController;
