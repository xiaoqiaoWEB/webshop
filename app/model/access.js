module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const AccessSchema = new Schema({
    module_name: {
      type: String
    },
    action_name: {
      type: String
    },
    //节点类型 :  1、表示模块   2、表示菜单   3、操作
    type: {
      type: Number
    },
    url:{
      type:String
    },
    //此module_id和当前模型的_id关联     module_id= 0 表示模块
    module_id: {
      // 混合类型
      type: Schema.Types.Mixed
    },
    sort:{
      type:Number,
      default:100
    },
    desc: {
      type:String
    },
    status:{
      type:Number,
      default:1
    },
    add_time:{
      type:Number,
      default:d.getTime()
    }
  });
  return mongoose.model('Access', AccessSchema, 'access');
}