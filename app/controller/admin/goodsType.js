'use strict';

var BaseController = require('./base.js');

class GoodsTypeController extends BaseController {
  async index() {
    let list = await this.ctx.model.GoodsType.find();
    await this.ctx.render('admin/goodsType/index', {
      list
    })
  }

  async add() {
    await this.ctx.render('admin/goodsType/add')
  }

  async doAdd() {
    let googsType = new this.ctx.model.GoodsType(this.ctx.request.body);
    await googsType.save();
    await this.success('/admin/goodsType/index', '添加商品类型成功！')
  }

  async edit() {
    let id = this.ctx.request.query.id;
    let detail = await this.ctx.model.GoodsType.find({'_id': id});
    await this.ctx.render('admin/goodsType/edit', {
      detail: detail[0]
    })
  }

  async doEdit() {
    let data = this.ctx.request.body;
    let id = data._id;
    await this.ctx.model.GoodsType.updateOne({'_id': id}, {
      title: data.title,
      desc: data.desc
    })

    await this.success('/admin/goodsType/index', '修改成功！')
  }
}

module.exports = GoodsTypeController;
