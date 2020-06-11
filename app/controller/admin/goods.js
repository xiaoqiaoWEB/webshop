'use strict';

const BaseController = require('./base');
const fs = require('fs');
const pump = require('mz-modules/pump');

class GoodsController extends BaseController {
  async index() {
    let { ctx } = this;
    let page = this.ctx.request.query.page || 1;
    let pageSize = 3;
    let totalNum = await this.ctx.model.Goods.find({}).count();
    let result = await ctx.model.Goods.find({}).skip((page - 1) * pageSize).limit(pageSize);

    await ctx.render('admin/goods/index', {
      list: result,
      // eslint-disable-next-line no-undef
      totalPages: Math.ceil(totalNum / pageSize),
      page,
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


  // 获取商品类型的属性 api接口
  async goodsTypeAttribute() {

    let cate_id = this.ctx.request.query.cate_id;

    // 注意 await
    let goodsTypeAttribute = await this.ctx.model.GoodsTypeAttribute.find({ "cate_id": cate_id })

    this.ctx.body = {
      result: goodsTypeAttribute,
    }

  }
}

module.exports = GoodsController;
