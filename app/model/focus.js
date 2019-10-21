'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const FocusSchema = new Schema({
    title: {
      type: String,
    },
    // 1 pc 2 webApp 3 小程序
    type: {
      type: Number,
    },
    focus_img: {
      type: String,
    },
    link: {
      type: String,
    },
    sort: {
      type: Number,
      default: 200,
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

  return mongoose.model('Focus', FocusSchema, 'focus');
}