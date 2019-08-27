module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const AccessRoleSchema = new Schema({
    access_id:{ type:Schema.Types.ObjectId },
    role_id: { type:Schema.Types.ObjectId },
    add_time: {
      type:Number,
      default:d.getTime()
    }
  })

  return mongoose.model('AccessRole', AccessRoleSchema, 'access_role');
}