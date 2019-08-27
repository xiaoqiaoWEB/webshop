'use strict';

const Service = require('egg').Service;
const url = require('url');

class AdminService extends Service {
  async checkAuth() {

    //1、获取当前用户的角色
    let userInfo = this.ctx.session.userInfo;
    let role_id = userInfo.role_id;

    // 获取当前访问的地址
    let pathName = url.parse(this.ctx.request.url).pathname;

    //忽略权限判断的地址    is_super = 1表示是超级管理员
    let ignoreUrl=['/admin/login','/admin/doLogin','/admin/verify','/admin/loginOut'];
    if(ignoreUrl.indexOf(pathName) != -1 || userInfo.is_super == 1) {
      return true;
    }

    // 获取当前角色的权限列表
    let roleAccessList = await this.ctx.model.AccessRole.find({'role_id': role_id});
    let roleAccessArr = [];
    roleAccessList.forEach(el => {
      roleAccessArr.push(el.access_id.toString())
    });

    // 获取当前访问的url 对应的权限id
    let accessUrlResult = await this.ctx.model.Access.find({'url': pathName});
    if(accessUrlResult.length>0) {
      let access_id = accessUrlResult[0]._id.toString();
      if(roleAccessArr.indexOf(access_id) != -1) {
        return true;
      }
      return false;
    }
    return false;
  }

  // 获取权限列表
  async getAuthList(role_id) {
    let accessLit = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from:'access',
          localField:'_id',
          foreignField:'module_id',
          as:'item'      
        }
      },
      {
        $match:{
          "module_id":'0'
        }
      }
    ])

    //查找当前角色的 所有权限   把所有权限放到一个数组中
    let roel_id_access = await this.ctx.model.AccessRole.find({'role_id': role_id});
    let roel_id_access_arr = roel_id_access.map((item) => {
      return item.access_id.toString();
    })

    // 判断当前权限是否在角色权限的数组中
    for(var i=0; i<accessLit.length; i++) {
      if(roel_id_access_arr.indexOf( accessLit[i]._id.toString() ) != -1) {
        //console.log('checked')
        accessLit[i].checked = true;
      }
      for(var j=0; j< accessLit[i].item.length; j++) {
        if(roel_id_access_arr.indexOf( accessLit[i].item[j]._id.toString() ) != -1) {
          accessLit[i].item[j].checked = true;
        }
      }
    }
    //console.log(accessLit[0].item[0])
    return accessLit;
  }
}

module.exports = AdminService;
