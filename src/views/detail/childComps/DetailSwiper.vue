// 商品详情界面的轮播图

<template>
  <swiper>
    <swiper-item
      v-for="(item, index) in topImages"
      :key="index"
      class="swiper-item"
    >
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>