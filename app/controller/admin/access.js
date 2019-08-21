'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
  async index() {
    //this.ctx.body = '权限设置'
    await this.ctx.render('admin/access/index')
  }

  async add() {
    await this.ctx.render('admin/access/add')
  }

  async edit() {
    await this.ctx.render('admin/access/edit')
  }

  async delete() {
    this.ctx.body = '权限delete'
  }
}

module.exports = AccessController;
