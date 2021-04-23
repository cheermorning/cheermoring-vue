import Vue from 'vue'

//导入自定义组件
import GlobalToast from "./GlobalToast";

//生成一个扩展的实例构造器
const ToastConstructor = Vue.extend(GlobalToast);

//定义提示组件的函数，接收三个参数， 消息内容， 类型， 持续时间
function globalToast(message, type="normal", duration=2000){
  //实例化组件对象
  const _toast = new ToastConstructor({
    data(){
      return{
        showToast: true,
        type,
        message,
        duration,
      }
    }
  });

  //将实例化的对象添加到body
  let element = _toast.$mount().$el;
  document.body.appendChild(element);

  //持续时间到了，隐藏
  setTimeout(()=>{
    _toast.showToast =false
  },duration)
}

//需要在main.js使用Vue.use(GlobalToast)
globalToast.install = (Vue)=>{
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  Vue.prototype.$toast = globalToast;
}

//导出
export default globalToast;
