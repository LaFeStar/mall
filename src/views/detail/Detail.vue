<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-navbar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-navbar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 监听滚动内容时，导航栏根据滚动位置跳动 -->
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 标题内容 将获取到的商品信息goods传递给DetailBaseInfo里面 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 商家信息组件 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!-- 商品尺码部分：将请求到数据传输给子组件 -->
      <detail-goods-param
        :goods-param="goodsParam"
        ref="params"
      ></detail-goods-param>
      <!-- 评论区 -->
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 商品推荐组件 -->
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click.native="BackTop" v-show="isShowBackTop"></back-top>
    <!-- 底部导航栏 获取底部导航栏加入购物车按钮的点击 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 点击添加购物车，跳出弹窗 -->
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavbar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailGoodsParam from "./childComps/DetailGoodsParam.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/Goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils"; // 防抖

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

// import Toast from "components/common/toast/Toast.vue";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [], // 商品轮播图的图片
      goods: {}, // 商品的数据，titleInfo  columns
      shop: {}, // 商家信息
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommend: [],
      itemImgListener: null,
      refresh1: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: "",
      show: false,
    };
  },
  created() {
    // 1、获取网址上的iid   并保存传递iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res); // 数据对象
      const data = res.data.result;
      // 1、获取顶部的轮播图图片数据
      this.topImages = data.itemInfo.topImages;

      // 2、获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns, // 收藏  销量
        data.shopInfo.services // 退换货 包邮
      );

      // 3、获取商家信息数据
      this.shop = new Shop(data.shopInfo);

      // 4、获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 5、获取商品尺码部分
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6、获取商品的评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      // // 当上面的数据加载完后，回调用该函数
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来了
      //   // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片)
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });
    // 3、请求详情推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommend = res.data.data.list;
    });

    // 给getThemeTopY赋值，进行防抖操作，即会重复操作的重复事件会只执行最后一次
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 个部分的具体位置
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    imageLoad() {
      // 刷新页面
      this.refresh1 = debounce(this.$refs.scroll.refresh, 1000);
      this.refresh1();
      this.getThemeTopY();
    },
    // 当点击导航栏时，跳到导航栏对应页面
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 500);
    },
    // 监听详情页的滚动，根据滚动位置的变化，显示正确的标题
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 返回顶部按钮的显示与隐藏：true || false
      this.isShowBackTop = positionY > 1000;
    },
    // 监听返回顶部按钮
    BackTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 监听加入购物车点击事件
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0]; // 图片
      product.title = this.goods.title; // 标题
      product.desc = this.goods.desc; // 描述
      product.price = this.goods.realPrice; // 价格
      product.iid = this.iid;

      // 2、跳转到index.js,调用vuex里面的方法 并将商品添加到购物车里（将数据传输到vuex中）
      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true;
        // this.message = res;
        // // console.log(res);
        // // 一段时间后弹窗消失
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 1000);
      });
    },
  },
  mounted() {
    // 利用防抖函数，短时间内多次触发的同一事件，执行一次
    const refresh = debounce(this.$refs.scroll.refresh, 1000);
    // 将事件监听进行保存
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  // 详情页面没有缓存kee-alive 所以没有deactivated
  // deactivated(){}
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>