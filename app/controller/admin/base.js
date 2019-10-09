'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, msg) {
    await this.ctx.render('admin/public/success', {
      redirectUrl,
      msg: msg || '操作成功！',
    });

  }

  async error(redirectUrl, msg) {
    await this.ctx.render('admin/public/error', {
      redirectUrl,
      msg: msg || '操作失败！',
    });

  }

  async verify() {
    const captcha = await this.service.tools.captcha();

    this.ctx.response.type = 'image/svg+xml'; /* 指定返回的类型 */

    this.ctx.body = captcha.data; /* 给页面返回一张图片 */
  }

  async delete() {
    let {
      model,
      id,
    } = this.ctx.request.query;
    await this.ctx.model[model].deleteOne({
      '_id': id
    });
    this.ctx.redirect(this.ctx.state.prevPage);
  }

  async changeStatus () {
    const { model, attr, id } = this.ctx.request.query;
    const data = await this.ctx.model[model].find({'_id': id});
    if (data.length > 0) {
      if (data[0][attr] === 1) {
        var json = {
          [attr]: 0,
        };
      } else {
        var json = {
          [attr]: 1,
        };
      }
      const updata = await this.ctx.model[model].updateOne({"_id": id}, json);
      if (updata) {
        this.ctx.body = {"message": '更新成功', "success": true};
      } else {
        this.ctx.body = {"message":'更新失败',"success":false};
      }
    } else {
      this.ctx.body = {"message":'更新失败,参数错误',"success":false};
    }
  }

  async editNum () {
    const { model, attr, num, id } = this.ctx.request.query;
    let data = await this.ctx.model[model].find({'_id': id});
    if (data.length > 0) {
      if (num) {
        var json = {
          [attr]: num,
        };
      }
      const updata = await this.ctx.model[model].updateOne({"_id": id},json);
      if (updata) {
        this.ctx.body = {"message":'更新成功',"success":true};
      } else {
        this.ctx.body = {"message":'更新失败',"success":false};
      }
    } else {
      this.ctx.body = {"message":'更新失败,参数错误',"success":false};
    }
  }
}

module.exports = BaseController;