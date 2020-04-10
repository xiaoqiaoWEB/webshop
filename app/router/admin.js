'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/login', controller.admin.login.login);
  router.get('/admin/verify', controller.admin.base.verify);
};
