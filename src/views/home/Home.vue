<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="2"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 监听事件 -->

      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐栏 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部按钮 监听组件事件 必须要 .native -->
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import TabControl from "components/content/TabControl";

import GoodsList from "components/content/Goods/GoodsList"; // Goods数据
import Scroll from "components/common/scroll/Scroll"; // scroll滚动
import BackTop from "components/content/backTop/BackTop"; // 返回顶部

// 轮播图
import HomeSwiper from "./childComps/HomeSwiper";
// 推荐栏
import HomeRecommendView from "./childComps/HomeRecommendView";
// 本周流行
import FeatureView from "./childComps/FeatureView.vue";

// 数据请求
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils"; // 防抖

export default {
  name: "Home",
  components: {
    navbar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 保存数据
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        // 流行页
        pop: { page: 0, list: [] },
        // 新款页
        new: { page: 0, list: [] },
        // 精选页
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // 是否隐藏发挥顶部按钮
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  created() {
    // 生命周期函数  在该组件创建好之前调用该函数
    // 1. 请求多个数据 也就是通过request获取data里面的单个数据
    // 异步操作
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 利用防抖函数，短时间内多次触发的同一事件，执行一次
    const refresh = debounce(this.$refs.scroll.refresh, 1000);
    // 监听item中图片加载完成
    // 对事件的监听进行保存
    this.itemImgListener = () => {
      // 每一张图片加载完成都进行页面的刷新
      // this.$refs.scroll.scroll.refresh();
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 监听点击【 流行 新款 精选 】 按钮
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 监听【返回顶部】按钮
    backclick() {
      // 找到自定义的ref=scroll，获取对应的组件对象div，再在该对象里面获取scroll属性/scrollTo()方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 监听页面的滚动事件【返回顶部按钮的隐藏和显示】，并返回滚动的位置x、y的值position
    contentscroll(position) {
      // console.log(position);
      // 返回顶部按钮的距离
      this.isShowBackTop = -position.y > 1000;
      // 流行、新款、精选栏 的距离  处理是否吸顶
      this.isTabFixed = -position.y > this.taboffsetTop;
    },

    // 监听上拉加载更多事件
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关的方法:请求数据，将数据存放到本地参数中
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 保存数据，避免数据被回收，没有意义
        // this.result = res;
        // console.log(this.result);
        this.banners = res.data.data.banner.list;
        // console.log(this.banners);
        this.recommends = res.data.data.recommend.list;
        // console.log(this.recommends);
      });
    },
    getHomeGoods(type) {
      // 商品数据
      // 动态网络请求数据，第几页
      const page = this.goods[type].page + 1;
      // 获取对应的type和page下的数据
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 在goods的对应的类型里面追加数据
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
  // 位于当前界面时：固定原有界面
  activated() {
    // 重新计算可滚动的区域
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // 离开当前界面时，记录下当前位置
  deactivated() {
    // 1、记录下当前位置
    this.saveY = this.$refs.scroll.scroll.y;
    // 2、当离开home界面时，对home监听图片加载的事件，取消全局事件的监听    $bus.$off("事件",函数)
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#home {
  /* vh: viewport height 可视化高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-size: 16px;
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9; */
}

/* 设置滚动组价的高度 */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>