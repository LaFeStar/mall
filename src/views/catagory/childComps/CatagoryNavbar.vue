<template>
  <div id="category-navbar">
    <scroll class="content">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          class="navbar-item"
          :class="{ active: currentIndex === index }"
          @click="navClick(index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "CatagoryNavbar",
  components: { Scroll },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    navClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    },
  },
};
</script>

<style scoped>
#category-navbar {
  background: #f0f0f0;
  height: 100%;
}
.content {
  height: 100%;
  overflow: hidden;
}
.navbar-item {
  font-size: 14px;
  height: 6vh;
  text-align: center;
  line-height: 6vh;
}
.active {
  border-left: 5px solid var(--color-tint);
  background: #fff;
  color: skyblue;
  font-size: 16px;
  text-align: left;
  padding-left: 5vw;
  font-weight: 700;
}
</style>