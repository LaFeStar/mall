import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

// 1、安装插件
Vue.use(Vuex)
// 2、创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []   // 用来存放加入购物车的商品数据
  },

  getters,
  components: {

  },
  mutations: {
    addCount(state, oldProduct) {
      oldProduct.count += 1
    },
    addToCart(state, payload) {
      payload.count = 1
      // 将商品追加到购物车时，追加一个多选属性checked,表示商品是否被选中
      payload.checked = false
      // 如当前商品不存在该数组内,则push追加该商品
      state.cartList.push(payload)
    }
  },
  actions: {
    // payload为Detali主界面传来的数据
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 将需加入购物车的商品的信息传入给cartList
        // 1、查找之前的数组中是否含有了该商品
        // （1）
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item;
        //   }
        // }
        // (2)
        // find函数 当前元素的遍历：元素.find()
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 遍历到当前商品是否存在，不存在oldProduct 为false   存在则为 true

        // 2、判断oldProduct
        if (oldProduct) {   // 如果商品存在，则商品的数量+1
          // oldProduct.count += 1
          // 调用mutations的函数
          context.commit("addCount", oldProduct)
          resolve("当前商品数量 +1 ")
        } else { // 如果商品不存在，则追加该商品
          // 调用mutations的函数
          context.commit("addToCart", payload)
          resolve("添加了新的商品")
        }
      })
    }
  }
})

// 3、挂载到Vue实例上
export default store