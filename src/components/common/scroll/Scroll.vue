<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    //  获取父组件里面的porbeType的值0,1没值，2鼠标滑动有值，3鼠标+惯性有值
    probeType: {
      type: Number,
      dafault: 0,
    },
    pullUpLoad: {
      type: Boolean,
      dafault: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  // 在组件加载结束后调用该函数
  mounted() {
    // 1、创建BScroll对象  监听活动
    this.scroll = new bscroll(this.$refs.wrapper, {
      observeDOM: true,
      probeType: this.probeType,
      // 是否滚到底部
      pullUpLoad: this.pullUpLoad,
      click: true,
    });

    // 2、监听滚动的位置，处理【返回顶部】按钮的显示与隐藏
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 将位置信息传输出去，
      this.$emit("scroll", position);
    });

    // 3、监听上拉加载事件:当页面上拉到顶部时，监听该事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 滚到页面底部时，将事件传递给父组件
        // console.log("底部");
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log("------");
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style>
</style>