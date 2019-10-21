'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const GoodsTypeAttributeSchema = new Schema({
    // 商品分类ID
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
    },
    // 类型  1 input    2  textarea    3、select
    attr_type: {
      type: String,
    },
    // 默认值： input  textarea默认值是空     select框有默认值  多个默认值以回车隔开
    attr_value: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
    sort: {
      type: Number,
      default: 1,
    },
  });

  return mongoose.model('GoodsTypeAttribute', GoodsTypeAttributeSchema, 'goods_type_attribute');
}