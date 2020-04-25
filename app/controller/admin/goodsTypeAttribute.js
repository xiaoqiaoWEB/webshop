'use strict';

const BaseController = require('./base');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    const { ctx } = this;
    const cate_id = ctx.request.query.id;
    let result = ctx.model.GoodsTypeAttribute.aggregate([
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
    });
  }

  async add() {
    
  }
}

module.exports = GoodsTypeAttributeController;
