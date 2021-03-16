import Vue from 'vue'
import axios from "axios";

//第四种方式：因为axios本身返回的就是一个Promise
const service = function(config){
  //1. 创建axios的实例
  let instance = axios.create({
    baseURL: 'https://httpbin.org',
    timeout: 6000
  })

  //2. 请求拦截器
  instance.interceptors.request.use(config=>{
    //在发送请求前做点什么
    setTimeout(()=>{
      console.log(config);

    }, 7000)
    return config;
  }, error => {
    //对请求错误做点什么
    return Promise.reject(error)
  })

  //3. 响应拦截器
  instance.interceptors.response.use(response=>{
    //在响应之后做点什么
      console.log(response);
    return response;
  }, error => {
    //对响应错误做点什么
    return Promise.reject(error)
  })
  return instance(config)
}

//第三种方式：使用new Promise封装
/*const service = function(config){
  return new Promise(((resolve, reject) => {
    //1. 创建axios的实例
    let instance = axios.create({
      baseURL: 'https://httpbin.org',
      timeout: 6000
    })

    instance(config).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  }))
}*/


//第二种方式：config是一个大参数，包含配置信息、成功和失败的回调函数
/*const service = function(config){
  //1. 创建axios的实例
  let instance = axios.create({
    baseURL: 'https://httpbin.org',
    timeout: 6000
  })

  instance(config.baseConfig).then(res=>{
    config.success(res);
  }).catch(err=>{
    config.failure(err);
  })
}*/

//第一种回调函数方式
/*const service = function(config, success, failure){

  //1. 创建axios的实例
  let instance = axios.create({
    baseURL: 'https://httpbin.org',
    timeout: 6000
  })

  instance(config).then(res=>{
    success(res);
  }).catch(err=>{
    failure(err);
  })
}*/

export default service