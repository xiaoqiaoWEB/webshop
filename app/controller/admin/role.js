'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/role/index');
  }
}

module.exports = RoleController;
