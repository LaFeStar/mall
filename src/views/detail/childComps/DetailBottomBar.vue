// 详情页面底部导航栏
<template>
  <div class="bottom-bar">
    <!-- 左边 -->
    <div class="item-left">
      <div class="a">
        <div class="icon service"></div>
        <div class="text">客服</div>
      </div>
      <div class="a">
        <div class="icon shop"></div>
        <div class="text">店铺</div>
      </div>
      <div class="a">
        <div class="icon select"></div>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="item-right">
      <div class="a cart" @click="addToCart">加入购物车</div>
      <div class="a buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom-bar",
  methods: {
    addToCart() {
      this.$emit("addCart");
      // 跳转到Detali主界面
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot?s0vkpl");
  src: url("fonts/icomoon.eot?s0vkpl#iefix") format("embedded-opentype"),
    url("fonts/icomoon.ttf?s0vkpl") format("truetype"),
    url("fonts/icomoon.woff?s0vkpl") format("woff"),
    url("fonts/icomoon.svg?s0vkpl#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.icon {
  font-family: "icomoon";
  text-align: center;
  margin-top: 8px;
}
.bottom-bar {
  /* 固定定位 */
  height: 49px;
  position: fixed;
  background-color: #f6f6f6;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
.bottom-bar > div {
  flex: 1;
  display: flex;
}
.a {
  flex: 1;
  text-align: center;
}
.item-left {
  font-size: 14px;
}
.item-right {
  font-size: 14px;
  text-align: center;
  line-height: 49px;
}

.cart {
  background-color: #f7da1e;
}
.buy {
  color: #fff;
  background-color: #317ffb;
}
</style>
