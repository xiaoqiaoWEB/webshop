'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const { ctx } = this;
    const accesslist = await ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
    await ctx.render('admin/access/index', {
      list: accesslist,
    });
  }

  async add() {
    const { ctx } = this;
    const moduleList = await ctx.model.Access.find({ module_id: '0' });
    await ctx.render('admin/access/add', {
      moduleList,
    });
  }

  async doAdd() {
    const { ctx, app } = this;
    let addResult = ctx.request.body;
    let module_id = addResult.module_id;
    if (module_id != 0) {
      addResult.module_id = app.mongoose.Types.ObjectId(module_id);
    }
    const access = await new ctx.model.Access(addResult);
    await access.save();
    await this.success('/admin/access', '权限添加成功！');
  }

  async edit() {
    const { ctx } = this;
    const moduleList = await ctx.model.Access.find({ module_id: '0' });
    const access = await ctx.model.Access.findById(ctx.query.id);

    await ctx.render('admin/access/edit', {
      list: access,
      moduleList,
    });
  }

  async doEdit() {
    const { ctx, app } = this;
    let addResult = ctx.request.body;
    let _id = ctx.request.body.id;
    let module_id = addResult.module_id;
    if (module_id != 0) {
      addResult.module_id = app.mongoose.Types.ObjectId(module_id);
    }

    await ctx.model.Access.findByIdAndUpdate(_id, addResult);
    await this.success('/admin/access', '修改权限成功！');
  }


}

module.exports = AccessController;
