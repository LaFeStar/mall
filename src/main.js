
// 启动文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from "fastclick"
// 图片懒加载
import VuelazyLoad from "vue-lazyload"
// 导入Vuex
import store from './store'
// 导入toast里面的index.js文件 【弹窗】
import toast from 'components/common/toast'


Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件 在项目开始运行就进行了调用toast
Vue.use(toast)
// 解决移动端300ms延迟问题  attach()附加   单纯简单调用就好
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VuelazyLoad, {
  loading: require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
