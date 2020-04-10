'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.post('/api/v1/admin/login', controller.admin.login.login);

  router.get('/api/v1/admin/user', jwt, controller.admin.login.user);
};
