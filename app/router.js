'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/admin/login', controller.admin.login.index);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);
  
  // 验证码
  router.get('/admin/verify', controller.admin.base.verify);

  router.get('/admin/manger', controller.admin.manger.index);
  router.get('/admin/manger/edit', controller.admin.manger.edit);
  router.get('/admin/manger/add', controller.admin.manger.add);

  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);

  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/add', controller.admin.access.add);
};
