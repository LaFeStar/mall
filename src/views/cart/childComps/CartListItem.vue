
// 购物车每一项商品的展示

<template>
  <div id="shop-item">
    <!-- 多选按钮 -->
    <div class="item-selector">
      <check-button
        @click.native="checkClick"
        :is-checked="cartItem.checked"
      ></check-button>
    </div>
    <!-- 商品图片 -->
    <div class="item-img">
      <img :src="cartItem.image" alt="商品图片" />
    </div>
    <!-- 商品信息 -->
    <div class="item-info">
      <!-- 商品的标题 -->
      <div class="item-title">{{ cartItem.title }}</div>
      <!-- 商品的描述 -->
      <div class="item-desc">{{ cartItem.desc }}</div>
      <div class="info-bottom">
        <!-- 商品的价格 -->
        <div class="item-price left">￥{{ cartItem.price }}</div>
        <!-- 商品的数量 -->
        <div class="item-price right">
          <button @click="decreaseCount">-</button>
          <div>×{{ cartItem.count }}</div>
          <button @click="increaseCount">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton.vue";

export default {
  name: "CartListItem",
  components: {
    checkButton,
  },
  props: {
    cartItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.cartItem.checked = !this.cartItem.checked;
    },
    decreaseCount() {
      if (this.cartItem.count > 1) {
        this.cartItem.count--;
      }
    },
    increaseCount() {
      this.cartItem.count++;
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  padding: 2px;
  border-bottom: 1px solid #ccc;
  background-color: #f7f6f4;
}
/* 多选按钮 */
.item-selector {
  width: 20px;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}
.item-title,
.item-desc {
  /* 一行显示 */
  overflow: hidden;
  /* 规定段落中的文本不换行 */
  white-space: nowrap;
  /* 溢出部分省略号 */
  text-overflow: ellipsis;
  font-size: 16px;
}
.item-title {
  margin-top: 8px;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.item-img {
  flex: 2;
  padding: 5px;
  text-align: center;
}
.item-img img {
  width: 90%;
  display: inline-block;
  border-radius: 5px;
}
.item-info {
  flex: 6;
  position: relative;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}

.info-bottom {
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .left {
  flex: 1;
  font-size: 16px;
  color: orangered;
}
.info-bottom .right {
  flex: 1;
  font-size: 16px;
  color: #999;
}
.right div {
  display: inline-block;
  width: 30px;
  margin: 0 5px;
}
.right button {
  background: #fff;
  font-size: 16px;
  /* text-align: center; */
  padding: 0 6px;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>