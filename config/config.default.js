/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1566389506265_8612';

  config.uploadDir = 'app/public/admin/upload';

  // mongose
  config.mongoose = { url: 'mongodb://127.0.0.1/apishop' };

  // view
  config.view = { mapping: { '.html': 'ejs' } };

  // middleware
  config.middleware = [ 'adminauth' ];
  config.adminauth = { match: '/admin' };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 8640000,
    httpOnly: true,
    encrypt: true,
    // 延长会话有效期
    renew: true,
  };

  return {
    ...config,
    ...userConfig,
  };
// eslint-disable-next-line semi
}
