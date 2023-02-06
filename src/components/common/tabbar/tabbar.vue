<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar",
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 固定定位 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -2px 2px rgba(100, 100, 100, 0.1);
}
</style>