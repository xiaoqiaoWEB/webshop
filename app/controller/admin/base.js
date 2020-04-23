'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  async success(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/success', {
      redirectUrl,
      message: message || '操作成功!',
    });
  }

  async error(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/error', {
      redirectUrl,
      message: message || '操作失败!',
    });
  }

  async verify() {
    const { ctx, service } = this;
    const captcha = await service.tool.getcaptcha();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }

  async delete() {

    /*
    1、获取要删除的数据库表   model
    2、获取要删除数据的id   _id
    3、执行删除
    4、返回到以前的页面           ctx.request.headers['referer']   (上一页的地址)
    */

    var model = this.ctx.request.query.model;   //Role      

    var id = this.ctx.request.query.id;

    await this.ctx.model[model].deleteOne({ "_id": id });            //注意写法

    this.ctx.redirect(this.ctx.state.prevPage);
  }


  async changeStatus() {
    let model = this.ctx.request.query.model; /* 数据库表 Model*/
    let attr = this.ctx.request.query.attr; /* 更新的属性 如:status is_best */
    let id = this.ctx.request.query.id; /* 更新的 id*/
    let result = await this.ctx.model[model].find({ "_id": id });
    if (result.length > 0) {

      if (result[0][attr] == 1) {
        var json = {
          [attr]: 0,
        };

      } else {
        var json = {
          [attr]: 1,
        };
      }

      // 执行更新操作
      let updateResult = await this.ctx.model[model].updateOne({ "_id": id }, json);

      if (updateResult) {
        this.ctx.body = { "message": '更新成功', "success": true };
      } else {
        this.ctx.body = { "message": '更新失败', "success": false };
      }

    } else {
      // 接口
      this.ctx.body = { "message": '更新失败,参数错误', "success": false };
    }
  }

  async editNum() {
    let model = this.ctx.request.query.model; /* 数据库表 Model*/
    let attr = this.ctx.request.query.attr; /* 更新的属性 如:sort */
    let id = this.ctx.request.query.id; /* 更新的 id*/
    let num = this.ctx.request.query.num; /* 数量*/

    let result = await this.ctx.model[model].find({ "_id": id });

    if (result.length > 0) {

      var json = {/*es6 属性名表达式*/

        [attr]: num
      }

      //执行更新操作
      var updateResult = await this.ctx.model[model].updateOne({ "_id": id }, json);

      if (updateResult) {
        this.ctx.body = { "message": '更新成功', "success": true };
      } else {

        this.ctx.body = { "message": '更新失败', "success": false };
      }

    } else {

      //接口
      this.ctx.body = { "message": '更新失败,参数错误', "success": false };


    }


  }


}

module.exports = BaseController;
