'use strict';
const url = require('url');

module.exports = (options, app) => {
  return async function adminauth (ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer'];
    const pathname = url.parse(ctx.request.url).pathname;

    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo;

      // 登陆用户 判断角色  获取 菜单
      let hasAuth = await ctx.service.admin.checkAuth();

      if (hasAuth) {
        ctx.state.asideList = await ctx.service.admin.getAythList(ctx.session.userinfo.role_id);
        await next();
      } else {
        ctx.body = '您没有权限访问当前地址';
      }
    } else {
      // 排除不需要做权限判断的页面
      if (pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
}