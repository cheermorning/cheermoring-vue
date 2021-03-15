import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import moduleA from "./module/moduleA";

//1. 在Vue上注册vuex
Vue.use(Vuex)

const state = {
  counter : 200,
  students:[
    {id:101, name:'why', age: 18},
    {id:102, name:'kobe', age: 24},
    {id:103, name:'james', age: 29},
    {id:104, name:'wade',age: 18}
  ],
  info:{
    id: 102,
    name: 'McGrady',
    age: 26
  }
}

//2. 创建Vuex.Store对象
const store = new Vuex.Store({
//  strict: process.env.NODE_ENV !== 'production', //严格模式, 生产环境应该不使用
  state,
  mutations,
  getters,
  actions,
  modules:{
    a: moduleA,
  },
})

//3. 导出
export default store