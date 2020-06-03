'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  
  let d = new Date();

  const GoodsAttrSchema = new Schema({

    goods_id: { type: Schema.Types.ObjectId },
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    attribute_id: {
      type: Schema.Types.ObjectId,
    },
    attribute_type: {
      type: String
    },
    attribute_title: {
      type: String
    },
    attribute_value: {
      type: String
    },
    // eslint-disable-next-line linebreak-style
    status: { type: Number, default: 1 },
    // eslint-disable-next-line linebreak-style
    add_time: {
      type: Number,
      default: d.getTime()
    }

  });

  return mongoose.model('GoodsAttr', GoodsAttrSchema, 'goods_attr');

}