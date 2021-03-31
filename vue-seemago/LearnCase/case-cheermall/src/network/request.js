import axios from 'axios'


export function request(config){

  //1. 创建axios实例
  let instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 6000
  })

  //2. 请求拦截器
  instance.interceptors.request.use(config=>{
    //console.log(config)
    return config;
  }, error => {
    //console.log(error)
    return Promise.reject(error);
  })

  //3. 响应拦截器
  instance.interceptors.response.use(response=>{
   //console.log(response.data)
    return response.data;
  }, error => {
    //console.log(error)
    return Promise.reject(error);
  })

  //4. 返回
  return instance(config)
}


