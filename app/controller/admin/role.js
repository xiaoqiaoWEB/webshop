'use strict';

var BaseController =require('./base.js');

class RoleController extends BaseController {
  async index() {
    let result = await this.ctx.model.Role.find({}).sort({"add_time": -1});
    await this.ctx.render('admin/role/index', {
      list: result
    })
  }

  async add() {
    await this.ctx.render('admin/role/add');
  }

  async doAdd() {
    let {title, desc} = this.ctx.request.body;
    let role = new this.ctx.model.Role({
      title, desc
    })
    await role.save();
    await this.success('/admin/role', '添加角色成功！')
    //await this.ctx.render('admin/role/add')
  }

  async edit() {
    let id = this.ctx.query.id;
    let result = await this.ctx.model.Role.find({'_id': id});
    await this.ctx.render('admin/role/edit', {
      data: result[0]
    })
  }

  async doEdit() {
    let {title, desc, _id} = this.ctx.request.body;
    await this.ctx.model.Role.updateOne({'_id': _id},{ title, desc});
    await this.success('/admin/role', '角色修改成功！')
  }
}

module.exports = RoleController;
