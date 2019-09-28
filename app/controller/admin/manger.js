'use strict';

const BaseController = require('./base.js');
const mongoose = require('mongoose');

class MangerController extends BaseController {
  async index() {
    let adminList = await this.ctx.model.Admin.aggregate([{
      $lookup:{
        from: 'role',
        localField: 'role_id',
        foreignField: '_id',
        as: 'role'
      }
    }])
    console.log(adminList)
    await this.ctx.render('admin/manger/index', {
      adminList,
    });
  }

  async add() {
    let roleList = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/manger/add', {
      roleList
    })
  }

  async doAdd() {
    let {username, password, mobile, email, role_id} = this.ctx.request.body;
    password = await this.ctx.service.tools.md5(password);

    // 判断用户名是否存在
    let adminResult = await this.ctx.model.Admin.find({'username': username})
    if(adminResult.length > 0) {
      await this.error('/admin/manger/add', '用户名重复！')
    } else {
      let admin = new this.ctx.model.Admin({
        username, password, mobile, email, role_id
      })
      await admin.save();
      await this.success('/admin/manger','增加用户成功');
    }
  }

  async edit() {
    let id = this.ctx.request.query.id;
    let roleList = await this.ctx.model.Role.find({});
    let adminDetail = await this.ctx.model.Admin.find({'_id': id})
    console.log(adminDetail)
    await this.ctx.render('admin/manger/edit', {
      roleList,
      adminDetail: adminDetail[0]
    })
  }

  async doEdit() {
    let {id, username, mobile, email, role_id} = this.ctx.request.body;
    //role_id = mongoose.Types.ObjectId()
    //console.log(role_id, 'aaaaaaa')
    await this.ctx.model.Admin.updateOne({"_id": id}, {
      username, mobile, email, role_id
    })
    await this.success('/admin/manger', '管理员信息修改成功')
  }
}

module.exports = MangerController;
