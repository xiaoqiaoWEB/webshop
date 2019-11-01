'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // main
  router.get('/admin', controller.admin.main.index);
  router.get('/admin/welcome', controller.admin.main.welcome);

  // login
  router.get('/admin/login', controller.admin.login.index);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);
  // 管理员
  router.get('/admin/manger', controller.admin.manger.index);
  router.get('/admin/manger/edit', controller.admin.manger.edit);
  router.get('/admin/manger/add', controller.admin.manger.add);
  router.post('/admin/manger/doAdd', controller.admin.manger.doAdd);
  router.post('/admin/manger/doEdit', controller.admin.manger.doEdit);

  // 角色
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);

  // 权限
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/doAuth', controller.admin.role.doAuth);

  // 权限列表
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);
  router.post('/admin/access/doEdit', controller.admin.access.doEdit);

  // 轮播图管理
  router.get('/admin/focus', controller.admin.focus.index);
  router.get('/admin/focus/add', controller.admin.focus.add);
  router.get('/admin/focus/edit', controller.admin.focus.edit);
  router.post('/admin/focus/doAdd', controller.admin.focus.doAdd);
  router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);

  // 商品类型
  router.get('/admin/goodsType/index', controller.admin.goodsType.index);
  router.get('/admin/goodsType/add', controller.admin.goodsType.add);
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd);
  router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit);

  // 商品类型属性
  router.get('/admin/goodsTypeAttribute', controller.admin.goodsTypeAttribute.index);
  router.get('/admin/goodsTypeAttribute/add', controller.admin.goodsTypeAttribute.add);
  router.post('/admin/goodsTypeAttribute/doAdd', controller.admin.goodsTypeAttribute.doAdd);
  router.get('/admin/goodsTypeAttribute/edit', controller.admin.goodsTypeAttribute.edit);
  router.post('/admin/goodsTypeAttribute/doEdit', controller.admin.goodsTypeAttribute.doEdit);

  // 商品分类
  router.get('/admin/goodsCate', controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
  router.post('/admin/goodsCate/doAdd', controller.admin.goodsCate.doAdd);


  // 公共路由
  router.get('/admin/delete', controller.admin.base.delete);
  // 验证码
  router.get('/admin/verify', controller.admin.base.verify);
  // 改变状态
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);
  // 改变 排序  价格 ==
  router.get('/admin/editNum', controller.admin.base.editNum);
};
