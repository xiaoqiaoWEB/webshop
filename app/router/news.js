'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.post('/news', controller.news.news.list);
  router.get('/news/:id/detail', controller.news.news.detail);
};
