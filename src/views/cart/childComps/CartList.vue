// 商品展示的区域
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item, index) in cartList" :key="index">{{ item }}</li> -->
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :cart-item="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  components: {
    Scroll,
    CartListItem,
  },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  // 每次进入该页面是进行数据刷新
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 38px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>