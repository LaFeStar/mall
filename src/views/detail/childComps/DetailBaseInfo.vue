// 商品标题内容相关信息

<template>
  <!-- v-if="Object.keys(goods).length !==0"  有数据时才展示该内容  -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 商品标题 -->
    <div class="info-title">{{ goods.title }}</div>
    <!-- 商品价格 -->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <!-- 折扣 -->
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <!-- 商品的销量、收藏数、退换货运费 -->
    <div class="info-columns">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <!-- 无理由退换货、发货 -->
    <div class="info-service">
      <span v-for="index in goods.services.length - 1" :key="index">
        <!-- v-for遍历：v-for="n in 10" 结果是从1-10 -->
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  padding: 0 10px;
}
.info-title {
  margin: 10px 0;
  font-size: 16px;
}
.info-price {
  margin-bottom: 15px;
}
.n-price {
  font-size: 18px;
  color: #fa6779;
  font-weight: 700;
  margin-right: 10px;
}
.o-price {
  color: #a0a0a0;
  font-size: 15px;
  margin-right: 10px;
  text-decoration: line-through;
}
.discount {
  color: #fff;
  background-color: #fa6779;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;
}
.info-columns {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #a0a0a0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-bottom: 10px;
}
.info-service {
  margin-top: 10px;
  line-height: 20px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-service img {
  width: 12px;
}
</style>