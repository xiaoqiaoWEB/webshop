'use strict';

const BaseController = require('./base.js');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    const cate_id = this.ctx.request.query.id;
    const result = await this.ctx.model.GoodsTypeAttribute.aggregate([
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
          "cate_id": this.app.mongoose.Types.ObjectId(cate_id),
        },
      },
      {
        $sort: {
          "sort": -1
        }
      }
    ]) 

    // console.log(result)
   
    await this.ctx.render('/admin/goodsTypeAttribute/index', {
      list: result,
      cate_id,
    });
  }

  async add() {
    let cate_id = this.ctx.request.query.id;
    let goodsType = await this.ctx.model.GoodsType.find({})
    await this.ctx.render('/admin/goodsTypeAttribute/add', {
      goodsTypeList: goodsType,
      cate_id,
    });
  }

  async doAdd() {
    let model = new this.ctx.model.GoodsTypeAttribute(this.ctx.request.body);
    await model.save();

    await this.success('/admin/goodsTypeAttribute?id=' + this.ctx.request.body.cate_id, '增加商品类型属性成功');
  }

  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.ctx.model.GoodsTypeAttribute.find({'_id': id});
    let goodsType = await this.ctx.model.GoodsType.find({});

    await this.ctx.render('/admin/goodsTypeAttribute/edit', {
      goodsTypeList: goodsType,
      detailt: result[0],
    });
  }

  async doEdit() {
    let id = this.ctx.request.body._id;
    let data = this.ctx.request.body;
    let cate_id = this.ctx.request.body.cate_id;
    let suc = await this.ctx.model.GoodsTypeAttribute.updateOne({'_id': id}, {
      cate_id,
      title: data.title,
      attr_type: data.attr_type,
      attr_value: data.attr_value,
      sort: data.sort,
    });
    await this.success('/admin/goodsTypeAttribute?id=' + this.ctx.request.body.cate_id, '修改商品类型属性成功！');
  }
}

module.exports = GoodsTypeAttributeController;
