<template>
  <!-- <div class="backTop" @click="backclick"> -->
  <div class="backTop">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  // methods: {
  //   backclick() {
  //     this.$emit("backclick");
  //   },
  // },
};
</script>

<style scoped>
.backTop {
  position: fixed;
  right: 8px;
  bottom: 55px;
}
.backTop img {
  width: 50px;
  height: 50px;
}
</style>