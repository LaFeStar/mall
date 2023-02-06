<template>
  <div class="tab-bar-item" @click="itemclick">
    <!-- <div class="font-icomoon"></div>
    <div>首页</div> -->
    <!-- 使用具名插槽 -->
    <div :class="{ active: isActive }">
      <!-- 插槽内不要动态绑定class，会被覆盖，不起效果 -->
      <slot name="item-icom"></slot>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbaritem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
  },
  methods: {
    itemclick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style>
.tab-bar-item {
  /* 将组件均等份划分 */
  flex: 1;
  text-align: center;
  height: 49px;
  line-height: 35px;
  font-size: 14px;
}
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
.font-icomoon {
  font-family: "icomoon";
  /* font-size: 16px; */
  height: 18px;
}
.active {
  color: red;
}
</style>