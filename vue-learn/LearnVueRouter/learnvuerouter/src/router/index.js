import Vue from 'vue'
import VueRouter from 'vue-router'

//普通方式加载路由
/*import Home from '../components/Home'
import About from '../components/About'
import User from '../components/User'*/

//路由懒加载方式
const Home = () => import('../components/Home')
const News = () => import('../components/home/News')
const Message = () => import('../components/home/Message')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')

//0. 解决重复点击按钮报错问题： Avoided redundant navigation to current location: "/about".
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalPush.call(this, location).catch(err => err)
}



//1. 安装VueRouter
Vue.use(VueRouter)


//2. 创建对象
const routes = [
  //路由的默认路径
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title: '首页'
    },
    children:[
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: News
      },
      {
        path: 'message',
        component: Message
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
    //路由共享守卫
    beforeEnter: (to,from,next)=>{
      //console.log('====')
      next()
    }
  },
  {
    path: '/user/:userId',
    component: User,
    meta:{
      title: '用户'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      title: '档案'
    },
  }
]

const  router = new VueRouter({
  routes,
  mode:'history' , //HTML5 History模式
  linkActiveClass: 'active' , //修改router-link的class属性，将 router-link-active修改为active，一般不需要改
})

//前置守卫(guard)
router.beforeEach((to, from, next) => {
  //1. 打印
  // console.log(to);
 // console.log("+++");
  //2. 标题改变，导航守卫
  // document.title = to.meta.title;
  document.title = to.matched[0].meta.title;
  //3. next跳转下一个
  next()
})

//后置钩子(hook)
router.afterEach((to, from) =>{
  //console.log('---');
  //console.log(to);
})

//3. 导出VueRouter实例
export default router