'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const { ctx } = this;

    const roles = await ctx.model.Role.find();

    await ctx.render('admin/role/index', {
      list: roles,
    });
  }

  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add');
  }

  async doAdd() {
    const { ctx } = this;

    const role = new ctx.model.Role({
      title: ctx.request.body.title,
      description: ctx.request.body.description,
    });

    await role.save();
    await this.success('/admin/role', '增加角色成功');
  }

  async edit() {
    const { ctx } = this;
    const data = await ctx.model.Role.findById(ctx.query.id);
    await ctx.render('admin/role/edit', {
      list: data,
    });
  }

  async doEdit() {
    const { ctx } = this;
    const { _id, title, description } = ctx.request.body;
    await ctx.model.Role.findByIdAndUpdate(_id, { title, description });
    await this.success('/admin/role', '修改角色成功');
  }
}

module.exports = RoleController;
