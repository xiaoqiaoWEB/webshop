'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  let d = new Date();

  const GoodsSchema = new Schema({
    title: { type: String },
    sub_title: { type: String },
    goods_sn: { type: String },
    cate_id: { type: Schema.Types.ObjectId },
    click_count: { type: Number, default: 100 },
    goods_number: { type: Number, default: 100 },
    shop_price: { type: Number },
    market_price: { type: Number },
    relation_goods: { type: String },
    goods_attrs: { type: String },
    goods_version: { type: String }, // 版本
    goods_img: { type: String },
    goods_gif: { type: String },
    godds_fitting: { type: String },
    goods_color: { type: String },
    goods_keywords: { type: String },
    goods_desc: { type: String },
    goods_content: { type: String },
    sort: { type: Number, default: 100 },
    is_delete: { type: Number, default: 1 },
    is_hot: { type: Number },
    is_best: { type: Number },
    is_new: { type: Number },
    goods_type_id: { type: Schema.Types.ObjectId },
    status: { type: Number, default: 1 },
    add_time: { type: Number, default: d.getTime() },
  });

  return mongoose.model('Goods', GoodsSchema, 'goods');
}
