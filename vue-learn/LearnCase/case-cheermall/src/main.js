import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import store from "./store";
import globalToast from "./components/common/toast";

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.use(globalToast);

//解决移动端点击300毫秒延迟问题
FastClick.attach(document.body);

//图片懒加载
const loadImage = require('./assets/img/common/placeholder.png')
Vue.use(VueLazyLoad, {
  loading: loadImage,
  attempt : 1
});


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
