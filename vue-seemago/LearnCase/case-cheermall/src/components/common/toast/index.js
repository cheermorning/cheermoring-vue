import Toast from "./Toast";
const obj = {}

obj.install = function(Vue){
  // console.log("Toast" + Vue)

  //1. 创建组件构造器
  const ToastConstructor = Vue.extend(Toast);
  //2. new的方式，根据组件构造器，创建一个组件对象
  let toast = new ToastConstructor();
  //3. 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));
  //4. 获取对象$el，添加到body中
  document.body.appendChild(toast.$el);
  //5. Vue原型加入toast对象
  Vue.prototype.$toast = toast;
}

export default obj
