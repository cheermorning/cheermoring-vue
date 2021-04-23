import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


//console.log(router);

// const obj = {
//   name: 'coder_yin'
// }

// let temp = null;
// //Object.defineProperty(obj, 'age', {value: 18, writable: true});
// Object.defineProperty(obj, 'age', {
//   // value : 19,
//   // writable : true,
//   get(){
//     return temp;
//   },
//   set(val){
//     temp = val
//   }
// })
//
// obj.age = 23

//console.log(obj);