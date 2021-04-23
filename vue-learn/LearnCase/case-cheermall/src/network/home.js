import {request} from "./request";

//获取轮播图和推荐中的数据
export function getHomeMultiData(){
  return request({
    url: '/home/multidata',
    method: 'get'
  })
}

//获取商品数据
export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    method: 'get',
    params: {
      type,
      page
    }
  })
}
