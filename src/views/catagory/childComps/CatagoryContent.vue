<template>
  <div class="content" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatagoryContent",
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
  /* 不包裹 多出的换行处理 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
}
.item {
  /* flex: 1; */
  width: 30%;
  margin: 8px 0;
  text-align: center;
}
.item img {
  width: 100%;
}
.item span {
  display: block;
  font-size: 13px;
}
</style>