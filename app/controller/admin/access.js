'use strict';

var BaseController =require('./base.js');

class AccessController extends BaseController {
  async index() {
    
    let result = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from:'access',
          localField:'_id',
          foreignField:'module_id',
          as:'item'      
        }
      },
      {
        $match:{
          "module_id":'0'
        }
      }
    ])

    await this.ctx.render('admin/access/index',{
      list: result
    })
  }

  async add() {
    // 模块
    let list = await this.ctx.model.Access.find({"module_id": '0'});
    await this.ctx.render('admin/access/add', {
      list
    })
  }

  async doAdd() {
    let requestBody = this.ctx.request.body;
    let id = requestBody.module_id;
    if(id != 0) {
      requestBody.module_id = this.app.mongoose.Types.ObjectId(id);
    }

    let access = new this.ctx.model.Access(requestBody);
    access.save();
    await this.success('/admin/access','增加权限成功');
  }

  async edit() {
    let id = this.ctx.query.id;
    // ID 详情
    let dataDetail = await this.ctx.model.Access.find({'_id': id});
    // 模块列表
    let list = await this.ctx.model.Access.find({"module_id": '0'});
    await this.ctx.render('admin/access/edit', {
      list,
      detail: dataDetail[0]
    })
  } 

  async doEdit() {
    let reqBody = this.ctx.request.body;
    let module_id = reqBody.module_id;

    if(module_id != 0) {
      reqBody.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }

    await this.ctx.model.Access.updateOne({'_id': reqBody.id}, reqBody)
    await this.success('/admin/access','修改权限成功');
  }
}

module.exports = AccessController;
