import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

import  service  from './network/request'
//对应第一种方式
/*service({
  url: '/get'
}, res=>{
  console.log(res)
}, err=>{
  console.log(err)
})*/

//对应第二种方式
/*service({
baseConfig: {url: '/get'}, success: res=>{
  console.log(res)
}, failure: err=>{
  console.log(err)
}
})*/

//对应第三种方式
service({
  url: '/get/123456'
}).then(res=> {
    console.log(res)
  }).catch(err=>{
  console.log(err);
})



