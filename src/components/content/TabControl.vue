// 流行  新款  精选  

<template>
  <div class="tab-control-content">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      @click="click(index)"
      :class="{ tabcontrolactive: index === currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "TabControl",
  props: {
    titles: {
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
    click(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-control-content {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: pink;
  font-size: 15px;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.tabcontrolactive {
  color: red;
}
.tabcontrolactive span {
  font-weight: 700;
  border-bottom: 3px solid red;
}
</style>