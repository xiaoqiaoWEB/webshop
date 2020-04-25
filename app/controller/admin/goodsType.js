'use strict';

const BseController = require('./base');

class GoodsTypeController extends BseController {
  async index() {
    const { ctx } = this;
    const list = await ctx.model.GoodsType.find();

    await ctx.render('admin/goodsType/index', {
      list,
    });
  }

  async add() {
    const { ctx } = this;
    await ctx.render('admin/goodsType/add');
  }

  async doAdd() {
    const { ctx } = this;
    const goodsType = await new ctx.model.GoodsType(ctx.request.body);
    await goodsType.save();
    await this.success('/admin/goodsType', '增加类型成功');
  }

  async edit() {
    const { ctx } = this;
    const id = ctx.request.query.id;
    const list = await ctx.model.GoodsType.findById(id);
    await ctx.render('admin/goodsType/edit', {
      list,
    });
  }

  async doEdit() {
    const { ctx } = this;
    const id = ctx.request.body._id;
    const { title, description } = ctx.request.body;
    await ctx.model.GoodsType.findByIdAndUpdate(id, { title, description });
    await this.success('/admin/goodsType', '修改类型成功');
  }
}

module.exports = GoodsTypeController;
