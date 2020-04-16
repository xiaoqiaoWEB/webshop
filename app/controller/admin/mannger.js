'use strict';

const BaseController = require('./base');

class ManngerController extends BaseController {
  async index() {
    const { ctx } = this;
    // 查询管理员 列表  并查询 管理员的 角色
    const resultAdmin = await ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);
    await ctx.render('admin/manager/index', {
      list: resultAdmin,
    });
  }

  async add() {
    const { ctx } = this;
    const roles = await ctx.model.Role.find();
    await ctx.render('admin/manager/add', {
      roleResult: roles,
    });
  }

  async doAdd() {
    const { ctx } = this;
    let data = ctx.request.body;
    data.password = await ctx.service.tool.md5(data.password);
    const user = await new ctx.model.Admin(data);
    await user.save();
    await this.success('/admin/manager', '添加管理员成功');
  }

  async edit() {
    const { ctx } = this;
    const roles = await ctx.model.Role.find();
    const adminResult = await ctx.model.Admin.findById(ctx.query.id);

    await ctx.render('admin/manager/edit', {
      roleResult: roles,
      adminResult,
    });
  }

  async doEdit() {
    const { ctx } = this;
    const _id = ctx.request.body.id;
    const pwd = ctx.request.body.password;
    const mobile = ctx.request.body.mobile;
    const email = ctx.request.body.email;
    const role_id = ctx.request.body.role_id;

    if (pwd) {
      const password = await ctx.service.tool.md5(pwd);
      await ctx.model.Admin.findByIdAndUpdate(_id, { password, mobile, email, role_id });
    } else {
      await ctx.model.Admin.findByIdAndUpdate(_id, { mobile, email, role_id });
    }

    await this.success('/admin/manager', '修改管理员成功！');
  }
}

module.exports = ManngerController;
