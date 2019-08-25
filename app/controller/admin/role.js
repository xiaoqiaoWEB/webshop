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

  async auth(){
    let role_id = this.ctx.request.query.id;
    // 查找所有的权限
    let accessLit = await this.ctx.service.admin.getAuthList(role_id);

    await this.ctx.render('admin/role/auth', {
      role_id,
      accessLit
    })
  }

  async doAuth() {
  /*   
  1、删除当前角色下面的所有权限
  2、把获取的权限和角色增加到数据库
  */
    let role_id = this.ctx.request.body.role_id;
    let access_node = this.ctx.request.body.access_node;

    //删除当前角色下面的所有权限
    await this.ctx.model.AccessRole.deleteMany({"role_id": role_id});

    for(var i=0; i<access_node.length; i++) {
      let accessRoleData = new this.ctx.model.AccessRole({
        role_id:role_id,
        access_id:access_node[i]
      })
      accessRoleData.save();
    }
    await this.success('/admin/role/auth?id='+role_id,"授权成功");
  }
}

module.exports = RoleController;
