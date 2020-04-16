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

  async auth() {
    const { ctx } = this;
    const role_id = ctx.query.id;
    const result = await ctx.service.admin.getAythList(role_id);

    await this.ctx.render('admin/role/auth', {
      list: result,
      role_id,
    });
  }

  async doAuth() {
    const { ctx } = this;
    /*
      1、删除当前角色下面的所有权限
      2、把获取的权限和角色增加到数据库
    */
    const role_id = ctx.request.body.role_id;
    let access_node = ctx.request.body.access_node;

    await this.ctx.model.RoleAccess.deleteMany({ role_id });

    for (var i = 0; i < access_node.length; i++) {
      let roleAccess = await new ctx.model.RoleAccess({
        role_id,
        access_id: access_node[i],
      });

      await roleAccess.save();
    }
    await this.success('/admin/role/auth?id=' + role_id, '授权成功');
  }
}

module.exports = RoleController;
