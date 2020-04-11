'use strict';
const url = require('url');

module.exports = (options, app) => {
  return async function adminauth (ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer'];
    const pathname = url.parse(ctx.request.url).pathname;

    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo;
      await next();
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