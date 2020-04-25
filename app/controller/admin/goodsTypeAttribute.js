'use strict';

const BaseController = require('./base');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    const { ctx } = this;
    const cate_id = ctx.request.query.id;
    let goodsType = await this.ctx.model.GoodsType.find({ "_id": cate_id });
    let result = await ctx.model.GoodsTypeAttribute.aggregate([
      {
        $lookup: {
          from: 'goods_type',
          localField: 'cate_id',
          foreignField: '_id',
          as: 'goods_type',
        },
      },
      {
        $match: {
          cate_id: this.app.mongoose.Types.ObjectId(cate_id),
        },
      },
    ]);

    await ctx.render('admin/goodsTypeAttribute/index', {
      list: result,
      cate_id,
      goodsType: goodsType[0],
    });
  }

  async add() {
    const { ctx } = this;
    const cate_id = ctx.request.query.id;
    const goodsTypes = await ctx.model.GoodsType.find();

    await ctx.render('admin/goodsTypeAttribute/add', {
      cate_id,
      goodsTypes,
    });
  }

  async doAdd() {
    const { ctx } = this;
    let goodsTypeAttribute = await new ctx.model.GoodsTypeAttribute(ctx.request.body);
    await goodsTypeAttribute.save();
    await this.success('/admin/goodsTypeAttribute?id=' + ctx.request.body.cate_id, '增加商品类型属性成功');
  }

  async edit() {
    const { ctx } = this;
    const id = ctx.request.query.id;
    const list = await ctx.model.GoodsTypeAttribute.findById(id);
    const goodsTypes = await ctx.model.GoodsType.find();

    await ctx.render('admin/goodsTypeAttribute/edit', {
      list,
      goodsTypes,
    });
  }

  async doEdit() {
    const { ctx } = this;
    const _id = ctx.request.body._id;
    await this.ctx.model.GoodsTypeAttribute.updateOne({"_id":_id},this.ctx.request.body);
    await this.success('/admin/goodsTypeAttribute?id='+this.ctx.request.body.cate_id,'修改商品类型属性成功');
  }
}

module.exports = GoodsTypeAttributeController;
