import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Catagory = () => import('../views/catagory/Catagory')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1、安装插件
Vue.use(VueRouter)

// 2、创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/catagory',
    component: Catagory
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/detail/:iid',
    component: Detail
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'

})

export default router