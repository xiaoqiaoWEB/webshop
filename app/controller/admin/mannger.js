'use strict';

const BaseController = require('./base');

class ManngerController extends BaseController {
  async index() {
    const { ctx } = this;
    const list = await ctx.model.Admin.find();
    await ctx.render('admin/manager/index');
  }
}

module.exports = ManngerController;
