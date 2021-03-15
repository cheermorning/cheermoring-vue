import Vue from 'vue'
import * as types from "./mutations-types";

export default {
  [types.INCREMENT](state){
    state.counter++
  },
  [types.DECREMENT](state){
    state.counter--
  },
  //传递参数 step 一个数字或者一个字符串
  [types.INCREMENT_BY_STEP](state, step){
    console.log(step);
    state.counter += step
  },
  //特殊风格的提交方式：payload加载的是一个提交对象
  [types.INCREMENT_BY_STEP_SS](state, payload){
    console.log(payload);
    state.counter += payload.step
  },
  [types.ADD_STUDENT](state,stu){
    let index = state.students.findIndex(v=> v.id === stu.id);
    console.log(index)
    if(index === -1){
      state.students.push(stu);
    }
  },
  [types.UPDATE_INFO](state){
    //响应式添加属性
    Vue.set(state.info, 'team', '火箭队')
    //响应式删除属性
    Vue.delete(state.info, 'age')
  }
}