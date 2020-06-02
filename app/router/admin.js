'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // code
  router.get('/admin/verify', controller.admin.base.verify);
  // changeStatus
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);
  // delete
  router.get('/admin/delete', controller.admin.base.delete);
  // editNum
  router.get('/admin/editNum', controller.admin.base.editNum);

  router.get('/admin', controller.admin.main.index);
  router.get('/admin/welcome', controller.admin.main.welcome);

  router.get('/admin/login', controller.admin.login.login);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);

  // role auth
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/doAuth', controller.admin.role.doAuth);

  // admin
  router.get('/admin/manager', controller.admin.mannger.index);
  router.get('/admin/manager/add', controller.admin.mannger.add);
  router.post('/admin/manager/doAdd', controller.admin.mannger.doAdd);
  router.get('/admin/manager/edit', controller.admin.mannger.edit);
  router.post('/admin/manager/doEdit', controller.admin.mannger.doAdd);

  // access
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.post('/admin/access/doEdit', controller.admin.access.doEdit);

  // focus
  router.get('/admin/focus', controller.admin.focus.index);
  router.get('/admin/focus/add', controller.admin.focus.add);
  router.post('/admin/focus/doAdd', controller.admin.focus.doAdd);
  router.get('/admin/focus/edit', controller.admin.focus.edit);
  router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);

  // goodsType
  router.get('/admin/goodsType', controller.admin.goodsType.index);
  router.get('/admin/goodsType/add', controller.admin.goodsType.add);
  router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd);
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit);

  // goodsTypeAttribute
  router.get('/admin/goodsTypeAttribute', controller.admin.goodsTypeAttribute.index);
  router.get('/admin/goodsTypeAttribute/add', controller.admin.goodsTypeAttribute.add);
  router.post('/admin/goodsTypeAttribute/doAdd', controller.admin.goodsTypeAttribute.doAdd);
  router.get('/admin/goodsTypeAttribute/edit', controller.admin.goodsTypeAttribute.edit);
  router.post('/admin/goodsTypeAttribute/doEdit', controller.admin.goodsTypeAttribute.doEdit);

  // goodsColor
  router.get('/admin/goodsColor', controller.admin.goodsColor.index);
  router.get('/admin/goodsColor/add', controller.admin.goodsColor.add);
  router.post('/admin/goodsColor/doAdd', controller.admin.goodsColor.doAdd);
  router.get('/admin/goodsColor/edit', controller.admin.goodsColor.edit);

  // goodsCate
  router.get('/admin/goodsCate', controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
  router.post('/admin/goodsCate/doAdd', controller.admin.goodsCate.doAdd);
  router.get('/admin/goodsCate/edit', controller.admin.goodsCate.edit);
  router.post('/admin/goodsCate/doEdit', controller.admin.goodsCate.doEdit);

};
