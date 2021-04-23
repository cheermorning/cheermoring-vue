'use strict'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //配置文件路径的别名，默认已经有 '@':'src'
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
