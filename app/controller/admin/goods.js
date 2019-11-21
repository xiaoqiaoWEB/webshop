'use strict';

const BaseController = require('./base.js');

const fs = require('fs');
const pump = require('mz-modules/pump');

class GoodsController extends BaseController {
  async index() {
    let goodsResult = await this.ctx.model.Goods.find({});
    // console.log(goodsResult)
    await this.ctx.render('admin/goods/index', {
      list: goodsResult,
    });
  }

  async add() {
    // 颜色列表
    let colorlist = await this.ctx.model.GoodsColor.find({});
    // 商品类型列表
    let typeList = await this.ctx.model.GoodsType.find({});
    // 商品分类
    let goodsCateList = await this.ctx.model.GoodsCate.aggregate([{
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'item',
        },
      },
      {
        $match: {
          "pid": '0',
        },
      },
    ]);

    await this.ctx.render('admin/goods/add', {
      colorlist,
      typeList,
      goodsCateList,
    });
  }

  // 获得商品类型 属性
  async getGoodsTypeAttribute() {
    let cate_id = this.ctx.request.query.cate_id;
    let list = await this.ctx.model.GoodsTypeAttribute.find({
      "cate_id": cate_id
    });
    this.ctx.body = {
      list,
    };
  }

  // 富文本图片上传
  async goodsUploadImage() {
    // 实现图片上传
    let parts = this.ctx.multipart({
      autoFields: true,
    });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; // file表单的名字

      // 上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });

    }
    // 图片的地址转化成 {link: 'path/to/image.jpg'} 
    this.ctx.body = {
      link: files.file,
    };
  }
  // 多图片上传
  async goodsUploadPhoto() {
    let parts = this.ctx.multipart({
      autoFields: true,
    });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; // file表单的名字

      // 上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
      // 生成缩略图
      this.service.tools.jimpImg(target);
    }
    this.ctx.body = {
      link: files.file,
    };
  }

  async doAdd() {
    let parts = this.ctx.multipart({
      autoFields: true
    });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; // file表单的名字

      // 上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
      // 生成缩略图
      this.service.tools.jimpImg(target);
    }

    let formData = Object.assign(files, parts.field);

    if (formData.goods_color && formData.goods_color.constructor === Array) {
      formData.goods_color = formData.goods_color.join(',');
    }

    // console.log(formData);

    // 保存商品信息
    let goodsData = new this.ctx.model.Goods(formData);
    let result = await goodsData.save();

    //  商品画册
    let goods_image_list = formData.goods_image_list;
    if (result._id && goods_image_list) {
      for (var i = 0; i < goods_image_list.length; i++) {
        let goodsImageRes = new this.ctx.model.GoodsImage({
          goods_id: result._id,
          img_url: goods_image_list[i],
        });

        await goodsImageRes.save();
      }
    }

    // 增加商品类型数据
    let attr_value_list = formData.attr_value_list;
    let attr_id_list = formData.attr_id_list;

    if (result._id && attr_id_list && attr_value_list) {

      for (var i = 0; i < attr_value_list.length; i++) {
        //查询goods_type_attribute
        if (attr_value_list[i]) {
          let goodsTypeAttributeResutl = await this.ctx.model.GoodsTypeAttribute.find({
            "_id": attr_id_list[i]
          });

          let goodsAttrRes = new this.ctx.model.GoodsAttr({
            goods_id: result._id,
            cate_id: formData.cate_id,
            attribute_id: attr_id_list[i],
            attribute_type: goodsTypeAttributeResutl[0].attr_type,
            attribute_title: goodsTypeAttributeResutl[0].title,
            attribute_value: attr_value_list[i]
          });

          await goodsAttrRes.save();
        }
      }

    }
    await this.success('/admin/goods', '增加商品数据成功');
  }

  async edit() {
    // console.log(this.ctx.request.query)
    let goodsResult = await this.ctx.model.Goods.find({
      "_id": this.ctx.request.query.id
    });
    // 颜色列表
    let colorlist = await this.ctx.model.GoodsColor.find({});
    // 商品类型列表
    let typeList = await this.ctx.model.GoodsType.find({});
    // 商品分类
    let goodsCateList = await this.ctx.model.GoodsCate.aggregate([{
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'item',
        },
      },
      {
        $match: {
          "pid": '0',
        },
      },
    ]);
    // 获取商品规格包装
    let goodAttrResult = await this.ctx.model.GoodsAttr.find({
      'goods_id': this.ctx.request.query.id
    });
    let goodsAttsStr = '';
    goodAttrResult.forEach(async (val) => {
      if (val.attribute_type == 1) {
        goodsAttsStr += `<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />  <input type="text" name="attr_value_list"  value="${val.attribute_value}" /></li>`;
      } else if (val.attribute_type == 2) {
        goodsAttsStr += `<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />  <textarea cols="50" rows="3" name="attr_value_list">${val.attribute_value}</textarea></li>`;
      } else {
        var oneGoodsTypeAttributeResult = await this.ctx.model.GoodsTypeAttribute.find({
          _id: val.attribute_id
        })
        var arr = oneGoodsTypeAttributeResult[0].attr_value.split('\n');

        goodsAttsStr += `<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />`;

        goodsAttsStr += `<select name="attr_value_list">`;

        for (var j = 0; j < arr.length; j++) {

          if (arr[j] == val.attribute_value) {
            goodsAttsStr += `<option value="${arr[j]}" selected >${arr[j]}</option>`;
          } else {
            goodsAttsStr += `<option value="${arr[j]}" >${arr[j]}</option>`;
          }
        }
        goodsAttsStr += `</select>`;
        goodsAttsStr += `</li>`;
      }
    })

    await this.ctx.render('admin/goods/edit', {
      colorlist,
      typeList,
      goodsCateList,
      goodsResult: goodsResult[0],
      goodsAttsStr
    });
  }
}
module.exports = GoodsController;