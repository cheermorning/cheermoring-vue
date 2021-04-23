import * as types from './mutations-types'

//方法区：主要接手异步方法
export default {
  /*context: 上下文，payload: 载荷*/
  //普通方式
  /*[types.A_UPDATE_INFO](context, payload){
    setTimeout(()=>{
      context.commit(types.UPDATE_INFO);
      console.log(payload);
    }, 2000)
  }*/
  //Promise方式
  [types.A_UPDATE_INFO]({commit, state}, payload){
    return new Promise((resolve, reject)=> {
      setTimeout(()=>{
        commit(types.UPDATE_INFO);
        console.log(payload, state.counter);
        resolve("我们这里已经提交完毕");
      }, 2000)
    })
  }
}