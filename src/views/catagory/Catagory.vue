<template>
  <div class="catagory">
    <!-- 对于button按钮 无论是否设置click：false，button都是可以点击的
    <button @click="btnclick">按钮</button>
    必须设置click:true，div才能监听到点击事件
    <div @click="divclick">呵呵呵</div> -->

    <!-- 顶部导航 -->
    <navbar><div slot="center">商品分类</div></navbar>
    <div class="main">
      <div class="left">
        <!-- 左边导航栏 -->
        <catagory-navbar
          :list="list"
          @selectItem="selectItem"
        ></catagory-navbar>
      </div>
      <div class="right">
        <scroll
          class="content"
          ref="scroll"
          :probe-type="2"
          @scroll="contentscroll"
        >
          <!-- 界面头的内容 -->
          <catagory-content
            :subcategories="showSubcategory"
            @swiperImageLoad="swiperImageLoad"
          ></catagory-content>
          <tab-control
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControl2"
          ></tab-control>
          <goods-list :goods="showCategoryGoods"></goods-list>
        </scroll>
        <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import Navbar from "components/common/navbar/navbar.vue";
import CatagoryNavbar from "./childComps/CatagoryNavbar.vue";
import TabControl from "components/content/TabControl.vue";
import CatagoryContent from "./childComps/CatagoryContent.vue";
import GoodsList from "components/content/Goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import {
  getCategorydata,
  getSubcategory,
  getCategoryDetail,
} from "network/catagory";

export default {
  name: "Category",
  components: {
    Scroll,
    Navbar,
    CatagoryNavbar,
    TabControl,
    CatagoryContent,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      list: [],
      cData: {},
      currentIndex: -1,
      currentType: "pop",
      isTabFixed1: false,
      isShowBackTop: false,
      taboffsetTop: 0,
    };
  },
  created() {
    // 请求接口的导航数据
    this.getCategorydata();
  },
  computed: {
    // 将获取到的数据传递给 【商品展示部分】
    showSubcategory() {
      if (this.currentIndex === -1) return;
      return this.cData[this.currentIndex].subcategories;
    },
    // 将获取到的数据传递给 【商品详情页面】
    showCategoryGoods() {
      if (this.currentIndex === -1) return;
      const cdata = this.cData[this.currentIndex].cDetail[this.currentType];
      // console.log(cdata1);
      return cdata;
    },
  },
  methods: {
    getCategorydata() {
      getCategorydata().then((res) => {
        // console.log(res);
        // 获取分类栏的数据
        this.list = res.data.data.category.list;
        // console.log(this.list);

        // 每一个导航对应的商品数据
        for (let i = 0; i < this.list.length; i++) {
          this.cData[i] = {
            // 头部数据
            subcategories: {},
            // 流行、新款、精选 对应的数据
            cDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this.getSubcategory(0);
      });
    },

    // 监听点击了哪一个nav
    selectItem(index) {
      this.getSubcategory(index);
    },

    // 获取Nav的数据(当点击哪一个导航栏时，对应获取那个导航对应的数据)
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.list[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        // console.log(res);
        this.cData[index].subcategories = res.data.data;
        this.cData = { ...this.cData };
        // 获取详情页的数据
        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },

    // 获取下面的详情数据
    getCategoryDetail(type) {
      const miniWallkey = this.list[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(res);
        this.cData[this.currentIndex].cDetail[type] = res.data;
        this.cData = { ...this.cData };
        // console.log(this.cData);
      });
    },

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
    contentscroll(position) {
      this.isShowBackTop = -position.y > 800;
      this.isTabFixed1 = -position.y > this.taboffsetTop;
    },
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  // 位于当前界面时：固定原有界面
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // 离开当前界面时，记录下当前位置
  deactivated() {
    // 1、记录下当前位置
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>

<style scoped>
.catagory {
  height: 100vh;
  position: relative;
}
.main {
  display: flex;
  /* overflow-y: scroll; */
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.left {
  flex: 1;
}
.right {
  flex: 3;
  /* background-color: pink; */
}
.right .content {
  height: 100%;
  overflow: hidden;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>