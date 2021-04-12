<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="nav-center">购物车</div>
    </nav-bar>
    <!--  商品选择项  -->
    <tab-control ref="tabControl1"
                 class="home-tab-control"
                 :titles="goodTypeNames"
                 @tabClick="tabClick"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMoreData"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 特色信息   -->
      <home-feature></home-feature>
      <!--  商品选择项  -->
      <tab-control ref="tabControl2"
                   class="home-tab-control"
                   :titles="goodTypeNames"
                   @tabClick="tabClick"
      ></tab-control>
      <!--  商品列表  -->
      <goods-list :goods="currentGoods"></goods-list>
    </scroll>

    <!--  回到顶部  -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "./children/HomeSwiper";
import HomeRecommend from "./children/HomeRecommend";
import HomeFeature from "./children/HomeFeature"


import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";


import {getHomeMultiData, getHomeGoods} from "network/home";

import {itemListenerMixin, backTopMixin} from "common/mixin";

import BScroll from '@better-scroll/core'
import PullUp from "@better-scroll/pull-up";

BScroll.use(PullUp)


export default {
  name: "Home",
  components: {
    HomeFeature,
    HomeSwiper,
    HomeRecommend,

    NavBar,
    TabControl,
    GoodsList,
    BackTop,

    Scroll,
  },
  data() {
    return {
      goodTypeNames: ['流行', '新款', '精选'],
      goodTypes: ['pop', 'new', 'sell'],
      banners: null,
      recommends: null,
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
      itemImageListener: null
    }
  },
  computed: {
    currentGoods() {
      let currentType = this.currentType
      return this.goods[currentType].list;
    }
  },
  created() {
    //获取轮播图等图片数据
    this.getHomeMultiData();

    //获取商品数据 ES6 for-of
    for (let code of this.goodTypes) {
      this.getHomeGoods(code);
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    //console.log('首页mounted');

    //console.log(this.$refs.tabControl2.$el.offsetTop);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.localRefresh();
    //console.log('home activated');
  },
  deactivated() {
    //console.log('首页deactivated');
    //1. 保存Y的位置
    this.saveY = this.$refs.scroll.getScrollY()
    //console.log('home deactivated')
  },
  destroyed() {
    //console.log("home destroyed");
  },
  methods: {
    //监听轮播图的图片加载完成
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //console.log(this.tabOffsetTop);
    },
    //防抖函数
    debounce(func,wait){
      let timeout;

      if(typeof func != "function"){
        throw new TypeError('这不是一个预期的函数')
      }

      return function(...args){
        //保存this指向
        let context = this;
        if(timeout) clearTimeout(timeout)

        timeout = setTimeout(()=>{
          func.apply(context, args);
        },wait)
      }

    },
    /*上拉加载更多数据*/
    loadMoreData(){
      this.getHomeGoods(this.currentType);
    },
    /*内容滚动定位：自定义事件，子组件向父组件传递数据*/
    contentScroll(position){
      //console.log(position)
      //回到顶部
      this.isShowBackTop = Math.abs(position.y) > 1500;

      //选项卡
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
      //console.log(this.isTabFixed);
    },

    /*选项卡点击事件监听*/
    tabClick(index) {
      console.log(index);
      this.currentType = this.goodTypes[index];
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        let data = res.data;
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //ES6  ...扩展运算符
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
 /*     padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #FFFFFF;
  font-size: 0.875rem;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*    position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9;*/
}

/*吸顶属性*/
.home-tab-control {
  position: relative;
  z-index: 9;
}

/*
.tabFixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
*/

/*
.home-content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
*/

.home-content{
  height: calc(100% - 93px);
  overflow: hidden;
/*  margin-top: 44px;*/
}

</style>
