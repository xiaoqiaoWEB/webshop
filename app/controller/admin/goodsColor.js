'use strict';

const BaseController = require('./base');

class GoodsColorController extends BaseController {
  async index() {
    const { ctx } = this;
    let list = await ctx.model.GoodsColor.find();
    await ctx.render('admin/goodsColor/index', {
      list
    })
  }

  async add() {
    const { ctx } = this;
    await ctx.render('admin/goodsColor/add');
  }

  async doAdd() {
    const {ctx} = this;
    let color = await new ctx.model.GoodsColor(ctx.request.body);
    await color.save();
    await this.success('/admin/goodsColor', '添加商品颜色成功！');
  }

  async edit() {
    const {ctx} = this;
    let id = ctx.request.query.id;

    let result = await ctx.model.GoodsColor.findById(id);
    await ctx.render('admin/goodsColor/edit', {
      result,
    });
  }
}

module.exports = GoodsColorController;
