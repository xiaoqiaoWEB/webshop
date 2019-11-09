'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const GoodsColorSchema = new Schema({
    color_name: {
      type: String,
    },
    color_value: {
      type: String,
    },
    sort: {
      type: Number,
      default: 100,
    },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });
  return mongoose.model('AccessGoods', GoodsColorSchema, 'goods_color');
}