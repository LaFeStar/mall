// 详情页面的头部
<template>
  <div>
    <navbar>
      <!-- 返回键 -->
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>

      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="item"
          :class="{ active: index === currentIndex }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/navbar";
export default {
  name: "DetailNavbar",
  components: {
    Navbar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      // 监听导航栏事件点击，并将事件传出
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.back img {
  margin-top: 12px;
}
.title {
  display: flex;
}
.item {
  flex: 1;
  /* font-size: 14px; */
}
.active {
  color: red;
  font-weight: 700;
}
</style>