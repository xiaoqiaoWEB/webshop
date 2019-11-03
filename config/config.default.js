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

  // add your middleware config here
  config.middleware = ['adminauth'];

  config.adminauth = {
    match: '/admin',
  };

  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000 * 3600 * 30,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  config.uploadDir = 'app/public/admin/upload'

  // config.cluster = {
  //   listen: {
  //     port: 9000
  //   }
  // }

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/eggshop',
  };
  
  // 配置表单数量
  config.multipart = {
    fields: '50',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
