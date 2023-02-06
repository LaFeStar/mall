// 弹窗组件
<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "默认文字", time = 1000) {
      this.message = message;
      this.isShow = true;
      //  延时显示
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, time);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  /* font-weight: 700; */
  border-radius: 20px;
}
</style>