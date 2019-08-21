'use strict';

const Controller = require('egg').Controller;

class MangerController extends Controller {
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
