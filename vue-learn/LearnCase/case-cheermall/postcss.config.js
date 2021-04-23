module.exports={
  plugins:{
    'postcss-px-to-viewport':{
      viewportWidth: 375, //设计稿的视口宽度
      viewportHeight: 667, //设计稿的视口高度
      viewportUnit: 'vw', //希望使用的视口单位
      fontViewportUnit: 'vw', //希望使用的字体单位
      unitToConvert: 'px', //需要转换的单位，默认为'px'
      unitPrecision: 5, //单位转换后保留的小数精度
      minPixelValue: 1, //最小的转换数值,如果设置为1,只有大于1的值会被转换
      mediaQuery:false, //媒体查询的单位是否需要转换
      selectorBlackList:['ignore', 'tab-bar'], //需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。，可以使用正则
      exclude: [/TabBar/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件, 可以使正则

    }
  }
}
