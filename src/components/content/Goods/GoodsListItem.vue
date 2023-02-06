<template>
  <div class="GoodsListItem" @click="itemclick">
    <img v-lazy="showImage" alt="商品图片" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ "￥" + goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      // 因为在home的goods里面的商品图片的地址 和 商品推荐页面里面的商品的地址不一样
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    // 监听为一事件的发生   $bus 事件总线 传输数据
    imageLoad() {
      // 将事件传输出去给home组件
      this.$bus.$emit("itemImageLoad");
    },
    itemclick() {
      // console.log("跳转到详情页面");
      // 监听事件点击，路由跳转  在地址上加上iid
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.GoodsListItem {
  width: 45%;
  position: relative;
  padding-bottom: 50px;
}
.GoodsListItem img {
  width: 100%;
  border-radius: 10px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  /* text-overflow 属性规定当文本溢出包含元素时发生的事情。 */
  /* ellipsis	显示省略符号来代表被修剪的文本。 */
  /* text-overflow: -o-ellipsis-lastline; */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 3px;
}
.price {
  color: red;
  font-size: 15px;
  font-weight: 700;
  margin-right: 30px;
}
.collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -2px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>