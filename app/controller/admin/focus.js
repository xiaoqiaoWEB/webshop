'use strict';

const BaseController = require('../admin/base');

class FocusController extends BaseController {
  async index() {
    const { ctx } = this;
    ctx.body = 'banner'
  }

  async add() {
    const { ctx } = this;
    await ctx.render('admin/focus/add');
  }
}

module.exports = FocusController;
