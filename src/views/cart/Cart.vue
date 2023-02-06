<template>
  <div class="cart">
    <!-- 头部导航栏 -->
    <navbar>
      <div slot="center">购物车({{ cartLength }})</div>
    </navbar>
    <!-- 购物车数据商品列表 -->
    <cart-list></cart-list>
    <!-- 底部商品汇总 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import CartList from "./childComps/CartList.vue";
import { mapGetters } from "vuex";
import CartButtonBar from "./childComps/CartButtonBar.vue";
export default {
  name: "Cart",
  components: {
    navbar,
    CartList,
    CartButtonBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
</style>