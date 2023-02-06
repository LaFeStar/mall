<template>
  <tabbar>
    <!-- 往tabbar.vue中的插槽放组件 -->
    <!-- 而tabbar.vue插槽的内容放在Tabbaritem.vue里面 -->
    <tabbaritem path="/home">
      <div slot="item-icom" class="font-icomoon"></div>
      <div slot="item-text">首页</div>
    </tabbaritem>
    <tabbaritem path="/catagory">
      <div class="font-icomoon" slot="item-icom"></div>
      <div slot="item-text">分类</div>
    </tabbaritem>
    <tabbaritem path="/cart">
      <div class="font-icomoon" slot="item-icom"></div>
      <div slot="item-text">购物车</div>
    </tabbaritem>
    <tabbaritem path="/profile">
      <div class="font-icomoon" slot="item-icom"></div>
      <div slot="item-text">我的</div>
    </tabbaritem>
  </tabbar>
</template>

<script>
import tabbar from "../common/tabbar/tabbar";
import tabbaritem from "../common/tabbar/Tabbaritem";

export default {
  components: { tabbar, tabbaritem },
};
</script>

<style>
</style>