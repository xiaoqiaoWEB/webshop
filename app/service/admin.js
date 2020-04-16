'use strict';

const Service = require('egg').Service;

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
}

module.exports = AdminService;
