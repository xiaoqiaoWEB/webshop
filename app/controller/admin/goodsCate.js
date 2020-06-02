'use strict';

const fs = require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');

class GoodsCateController extends BaseController {
  async index() {
    const { ctx } = this;
    let result = await ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      {
        $match: {
          pid: '0',
        },
      },
    ]);

    await ctx.render('admin/goodsCate/index', {
      list: result,
    });
  }

  async add() {
    const { ctx } = this;
    let result = await ctx.model.GoodsCate.find({ pid: '0' });
    await ctx.render('admin/goodsCate/add', {
      cateList: result,
    });
  }

  async doAdd() {
    const { ctx } = this;
    let parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;

    // eslint-disable-next-line no-undef
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname;
      // 上传图片的目录
      let dir = await this.service.tool.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });
      // 生成缩略图
      this.service.tool.jimpImg(target);
    }

    if (parts.field.pid != 0) {
      parts.field.pid = this.app.mongoose.Types.ObjectId(parts.field.pid);

    }

    let goodsCate = new this.ctx.model.GoodsCate(Object.assign(files, parts.field));
    await goodsCate.save();

    await this.success('/admin/goodsCate', '增加分类成功');
  }
}

module.exports = GoodsCateController;
