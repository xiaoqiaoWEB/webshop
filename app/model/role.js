module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const RoleSchema = new Schema({
    title: {
      type: String
    },
    desc: {
      type: String
    },
    status: {
      type: Number,
      default: 1
    },
    add_time: {
      type: Number,
      default: d.getTime()
    }
  });
  return mongoose.model('Role', RoleSchema, 'role');
}