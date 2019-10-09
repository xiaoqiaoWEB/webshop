'use strict';

const url = require('url');

module.exports = () => {
  return async function adminauth (ctx, next) {

    // 设置csrf
    ctx.state.csrf = ctx.csrf;
    // 记录上一页
    ctx.state.prevPage = ctx.request.headers['referer'];

    let requrl = ctx.request.url;
    let pathname = url.parse(requrl).pathname;

    // 判断是否登录
    if(ctx.session.userInfo) {
      ctx.state.userInfo = ctx.session.userInfo;
      // 判断是否有权限
      let authAccess = await ctx.service.admin.checkAuth();
      if(authAccess) {
        // 获取左侧菜单
        let sildeList = await ctx.service.admin.getAuthList(ctx.state.userInfo.role_id);
        ctx.state.sildeList = sildeList;
        await next();
      } else {
        ctx.body = "你没有权限！"
      }
    } else {
      // 排除 登录页 验证码 
      if(pathname == "/admin/login" || pathname == "/admin/verify" || pathname == "/admin/doLogin") {
        await next();
      } else {
        ctx.redirect('/admin/login')
      }
    }
  }
}