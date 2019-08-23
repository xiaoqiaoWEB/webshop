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
    match: '/admin'
  }

  config.session={
    key:'SESSION_ID',
    maxAge: 1000*3600*30,
    httpOnly: true,
    encrypt: true,
    renew: true //  延长会话有效期       
  }

  config.view = {
    mapping: {
      '.html': 'ejs',
    }
  }

  config.mongoose = {
    url: 'mongodb://shopadmin:123456@127.0.0.1:27017/eggshop',
    options: {}
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
