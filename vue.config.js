/*
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
 */

// 修改文件的别名

module.exports = {
  runtimeCompiler: true,
  publicPath: './',  
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    }
  }
}