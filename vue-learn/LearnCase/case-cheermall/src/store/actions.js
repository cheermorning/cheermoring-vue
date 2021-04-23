import {ADD_COUNTER, ADD_TO_CART} from "./mutations-type";
export default {
  addCart({state, commit}, payload){
    //可以返回一个Promise
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      if(oldProduct){
        commit(ADD_COUNTER, oldProduct)
        resolve("商品数量+1成功")
      }else{
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve("添加新商品成功")
      }
    })

  }

}
