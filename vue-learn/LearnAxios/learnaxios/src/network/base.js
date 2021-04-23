//1. 导入axios
import axios from 'axios'

//1. 不传参
/*axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: 'get'
}).then(res=>{
  console.log(res);
})*/

//2.传参
/*axios.get('http://123.207.32.32:8000/home/data', {
    params: {
      type: 'pop',
      page: 1
    }
  }
).then(res=>{
  console.log(res);
})*/

//4. 抽取默认配置
// axios.defaults.baseURL = 'https://httpbin.org' ;
// axios.defaults.timeout = 6000;

//3. 执行多个并发请求
/*axios.all([
  axios({
  url: '/home/multidata'
  }),
  axios.get('/home/data', {
    params: {
      type: 'sell',
      page: 5
    }
  })
]).then(axios.spread((res1, res2)=>{
  console.log(res1)
  console.log(res2)
}))*/

//5. 各种http请求方法演练

//get请求
// axios.get('/get').then(res=>{
//   console.log(res)
// })
//
// //post请求
// axios.post('/status/100', {
//     codes: 100
// }, {}).then(res=>{
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// })
//
// //put请求
// axios.put('/delay/1', {
//   delay: 1
// }, {}).then(res=>{
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// })
//
// //patch请求
// axios.patch('/delay/5', {
//   delay: 5
// },{}).then(res=>{
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// })
//
// //delete请求
// axios.delete('/delay/1',{
//   params:{
//     delay: 1
//   }
// }).then(res=>{
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// })