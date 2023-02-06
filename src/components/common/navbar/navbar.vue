//  标题栏
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
  background-color: #ff8198;
  color: #fff;
  font-size: 16px;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>