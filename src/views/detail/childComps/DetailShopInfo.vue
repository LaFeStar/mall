// 商家信息模块

<template>
  <div class="shop-info">
    <!-- 商家Logo 名字 -->
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item middle-left">
        <div class="shop-sells">
          <div class="sells-count">{{ sellCount(shop.sells) }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="shop-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="item-score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="item-isBetter" :class="{ 'better-more': item.isBetter }">
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    // 获取父组件传递过来的 shop 数据
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    sellCount(value) {
      if (value < 10000) return value;
      // toFixed(n) 方法可把 Number 四舍五入为指定小数 n 位数的数字。
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 10px;
  border-bottom: 5px solid rgba(100, 100, 100, 0.1);
}
.shop-top {
  /* line-height: 45px; */
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
}
.shop-top span {
  font-size: 15px;
  margin-left: 10px;
}
.shop-middle {
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.middle-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.sells-count,
.goods-count {
  font-size: 20px;
}
.sells-text,
.goods-text {
  font-size: 12px;
  margin-top: 8px;
}
.middle-right {
  font-size: 12px;
  margin-left: 15px;
}
/* 区分高低分 */
.item-score {
  padding: 2px 10px;
  color: #5ea732;
  font-weight: 700;
}
.score-better {
  color: #f13e3a;
}
.item-isBetter {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
  padding: 1px 5px;
  border-radius: 3px;
}
.better-more {
  background-color: #f13e3a;
}
.shop-bottom {
  margin-top: 10px;
}
.enter-shop {
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  border-radius: 10px;
}
</style>