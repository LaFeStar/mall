
// 购物车页面的底部汇总计算栏

<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="shop-sum">合计：¥{{ totalPrice }}</div>
    <div class="jisuan" @click="jisuanClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton.vue";
export default {
  name: "CartButtonBar",
  components: { checkButton },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      return (
        this.$store.state.cartList
          .filter((item) => {
            // 过滤掉checked为false的数据（相当于遍历）
            return item.checked;
          })
          // 将剩下得数据进行一次汇总 preValue为前一个值,即为计算的前一个值
          .reduce((preValue, item) => {
            // item.price * item.count 计算的都是最后的一个值
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2) // 保留两位小数
      );
    },
    // 计算商品数量
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    // 单个商品选中情况：
    isSelectAll() {
      // 遍历查询商品的选中状态，(全部商品true > 全选按钮true)  （存在一个商品false > 全选false)
      // 购物车为空时
      if (this.$store.state.cartList.length === 0) return false;
      // 1、使用高阶函数 filter
      // 筛选出 !item.checked 为 false ，并取他的长度，也就是当存在有false的就有长度（true），再取反（false）
      // return !this.$store.state.cartList.filter((item) => !item.checked).length;

      // 2、使用高阶函数 find
      // find 当筛选出一个值时就停止遍历
      // return !this.$store.state.cartList.find((item) => !item.checked);

      // 3、普通遍历方法
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    // 监听全选按钮
    checkClick() {
      // 当全选按钮为全选中的时候，点击全选按钮，将全部商品改为不选中false
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      }
      // 当全选按钮为不选中状态的时候，点击全选按钮，将全部商品改为选中true
      else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    // 监听点击结算按钮时
    jisuanClick() {
      if (this.checkLength == 0) {
        this.$toast.show("请选择购买的商品", 1000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  /* 定位 */
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.check-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.shop-sum {
  flex: 2;
  color: red;
  font-size: 14px;
}

.jisuan {
  flex: 1;
  margin-right: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
}
</style>