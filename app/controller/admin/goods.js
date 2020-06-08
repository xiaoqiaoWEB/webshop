'use strict';

const BaseController = require('./base');
const fs = require('fs');
const pump = require('mz-modules/pump');

class GoodsController extends BaseController {
  async index() {
    let { ctx } = this;
    let result = await ctx.model.Goods.find({});
    await ctx.render('admin/goods/index', {
      list: result,
    });
  }

  async add() {
    let { ctx } = this;
    // 所有的颜色
    let colorList = await ctx.model.GoodsColor.find({});
    // 商品类型
    let goodsType = await ctx.model.GoodsType.find({});
    // 商品分类
    let goodsCate = await ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      {
        $match: {
          pid: '0',
        },
      },
    ]);

    await this.ctx.render('admin/goods/add', {
      colorResult: colorList,
      goodsType,
      goodsCate,
    });
  }

  async doAdd() {
    this.ctx.body = 'doadd';
  }
}

module.exports = GoodsController;
