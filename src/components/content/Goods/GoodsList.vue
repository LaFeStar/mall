<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // data() {
  //   return {};
  // },
  // watch: {
  //   goods() {
  //     console.log(this.goods);
  //   },
  // },
};
</script>

<style>
.goods {
  display: flex;
  /* 不包裹 多出的换行处理 */
  flex-wrap: wrap;
  /* 均等分 
  在弹性盒对象的 <div> 元素中的各项周围留有空白： */
  justify-content: space-around;
  margin-top: 10px;
}
</style>