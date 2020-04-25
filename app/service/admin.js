'use strict';

const Service = require('egg').Service;
const url = require('url');

class AdminService extends Service {
  async getAythList(role_id) {
    /*
      1、获取全部的权限
      2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
      3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中
    */

    let result = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);

    const roleAccess = await this.ctx.model.RoleAccess.find({ role_id });
    let roleAccessArray = [];
    roleAccess.forEach(el => {
      roleAccessArray.push(el.access_id.toString());
    });

    for (var i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) != -1) {
        result[i].checked = true;
      }

      for (var j = 0; j < result[i].items.length; j++) {
        if (roleAccessArray.indexOf(result[i].items[j]._id.toString()) != -1) {
          result[i].items[j].checked = true;
        }
      }
    }
    return result;
  }

  async checkAuth() {
    /*
        1、获取当前用户的角色        （忽略权限判断的地址    is_super）
        2、根据角色获取当前角色的权限列表
        3、获取当前访问的url 对应的权限id
        4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    let role_id = this.ctx.session.userinfo.role_id;
    let pathName = url.parse(this.ctx.request.url).pathname;

    // 忽略权限判断的地址    is_super表示是管理员
    let ignoreUrl= [ '/admin/login', '/admin/doLogin', '/admin/verify', '/admin/loginOut' ];


    // console.log(this.ctx.session.userinfo)

    if(ignoreUrl.indexOf(pathName) != -1 || this.ctx.session.userinfo.is_super == 1) {
      return true; // 允许访问
    }

    // 根据角色获取当前角色的权限列表
    const roleAccess = await this.ctx.model.RoleAccess.find({ role_id });
    let roleAccessArray = [];
    roleAccess.forEach(el => {
      roleAccessArray.push(el.access_id.toString());
    });

    let accessUrlResult = await this.ctx.model.Access.find({'url': pathName});
    if(accessUrlResult.length > 0) {
      if(roleAccessArray.indexOf(accessUrlResult[0]._id.toString()) >= 1) {
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = AdminService;
