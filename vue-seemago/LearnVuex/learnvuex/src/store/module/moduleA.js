import * as types from '../mutations-types'

export default {
  // namespaced : true, //命名空间
  state: {
    name: 'zhangsanfeng',
  },
  mutations: {
    [types.UPDATE_NAME](state, payload){
      console.log(state)
      state.name = payload
    },
  },
  getters: {
    name1(state){
      return state.name + '111';
    },
    name2(state,getters){
      return getters.name1 + '222';
    },
    name3(state, getters, rootState){
      return getters.name2 + rootState.counter
    },
  },
  actions: {
    [types.A_UPDATE_NAME]({state, getters, commit, rootState}, payload){
      console.log(getters);
      return new Promise(((resolve, reject) => {
        setTimeout(()=>{
          console.log(payload);
          commit(types.UPDATE_NAME, payload);
          resolve('子模块A已提交完毕')
        })
      }))
    }
  }
}