import {ADD_COUNTER, ADD_TO_CART} from "./mutations-type";

/**
 * mutations的唯一目的就是修改state中的内容
 * mutations的每个方法应该都是做单一的事情
 * 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation
 */
export default {
  [ADD_COUNTER](state, payload){
    payload.count++;
  },
  [ADD_TO_CART](state, payload){
    payload.checked = true;
    state.cartList.push(payload);
  }
}
