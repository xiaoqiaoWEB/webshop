'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();

  const GoodsCateSchema = new Schema({
    title: { type: String },
    cate_img: { type: String },
    filter_attr: { type: String },
    /* 指定当前分类的模板 */
    template: { type: String },
    link: { type: String },
    pid: {
      type: Schema.Types.Mixed, // 混合类型
    },
    sub_title: { type: String }, /* seo相关的标题  关键词  描述 */
    keywords: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    sort: { type: Number, default: 100 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });

  return mongoose.model('GoodsCate', GoodsCateSchema, 'goods_cate');
}