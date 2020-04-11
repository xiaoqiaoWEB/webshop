'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  
  router.get('/admin/login', controller.admin.login.login);
  router.post('/admin/doLogin', controller.admin.login.doLogin);

  router.get('/admin/verify', controller.admin.base.verify);
  router.get('/admin/role', controller.admin.role.index);
};
