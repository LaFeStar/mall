<template>
  <div class="recommend">
    <div
      class="recommend_item"
      v-for="(item, index) in recommends"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="recommend_item_title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  padding: 8px 5px 15px;
  border-bottom: 8px solid #eee;
}
.recommend_item {
  flex: 1;
  text-align: center;
}
.recommend_item a img {
  width: 90%;
}
.recommend_item_title {
  margin-top: 5px;
  font-size: 12px;
}
</style>