module.exports = {
  plugins: {
    autoprefixer: {},
    // 动态切换在不同的手机上面去动态调整内容大小进行显示
    // 以iPhone6为主
    'postcss-px-to-viewport': {
      viewportWidth: 375, //  视窗的宽度，对应的是我们设计稿的宽度，移动端一般是750，如果是pc端那就是类似1920这样的尺寸
      viewportHeight: 677, // 视窗的高度，移动端一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 'tab-bar', 'tab-bar-item'
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/TabBar/]
    },
    // 1.在js中使用正则: /正则相关规则/
    // 2.exclude中存放的元素必须是正则表达式
    // 3.按照排除的文件写对应的正则:
    // 正则的规则：
    // 1> ^abc: 表示匹配的内容，必须以什么内容开头(以abc开头)
    // 2> abc$: 表示匹配的内容，必须以什么内容结尾(以abc结尾)
  }
}
