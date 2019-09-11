'use strict';

var BaseController = require('./base.js');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    let cate_id = this.ctx.request.query.id;
    var result=await this.ctx.model.GoodsTypeAttribute.aggregate([
      {
        $lookup: {
          from: 'goods_type',
          localField: 'cate_id',
          foreignField: '_id',
          as:'goods_type'
        }
      },
      {
        $match: {
          "cate_id": this.app.mongoose.Types.ObjectId(cate_id)
        }
      }
    ]) 

    console.log(result)
   
    await this.ctx.render('/admin/goodsTypeAttribute/index', {
      list: result,
      cate_id
    })
  }

  async add() {
    let cate_id = this.ctx.request.query.id;
    let goodsType = await this.ctx.model.GoodsType.find({})
    await this.ctx.render('/admin/goodsTypeAttribute/add', {
      goodsTypeList: goodsType,
      cate_id
    })
  }

  async doAdd() {
    let model = new this.ctx.model.GoodsTypeAttribute(this.ctx.request.body);
    await model.save();

    await this.success('/admin/goodsTypeAttribute?id='+this.ctx.request.body.cate_id,'增加商品类型属性成功');
  }
}

module.exports = GoodsTypeAttributeController;
