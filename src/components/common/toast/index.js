
// 导入Toast组件

import Toast from './Toast'
const obj = {}
// 执行函数系统会默认传递一个Vue参数
obj.install = function (Vue) {
  // console.log('执行了toast函数');
  // document.body.appendChild(Toast.$el)
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3、将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el对应就是上面创建的div元素了
  // 将$el添加到需要的页面
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj