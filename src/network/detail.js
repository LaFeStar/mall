// 商品详情页面 数据请求

import { request } from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
// 详情页面下的推荐内容
export function getRecommend() {
  return request({
    url: '/recommend',
  })
}


// 导出class 利用class见请求过来的数据进行整合，
// 商品相关信息
export class Goods {
  constructor(itemInfo, columns, services) {
    // 商品标题
    this.title = itemInfo.title
    this.desc = itemInfo.desc    // 商品的描述
    // 商品的价格
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    // 折扣
    this.discount = itemInfo.discountDesc
    // 销量与收藏
    this.columns = columns
    // services为数组：包邮、退换
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 商家相关信息
export class Shop {
  constructor(shopInfo) {
    // 商家logo
    this.logo = shopInfo.shopLogo;
    // 商家名字
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    // 商品总销量
    this.sells = shopInfo.cSells;
    // score为数组>对象  [1描述相符{}  2价格合理{}  3质量满意{}]
    this.score = shopInfo.score;
    // 全部宝贝
    this.goodsCount = shopInfo.cGoods
  }
}

// 商品尺码
export class GoodsParam {
  constructor(info, rule) {
    // images 可能没有值（有些商品有，有些商品没有）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

