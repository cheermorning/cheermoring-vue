<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="nav-center">购物车</div>
    </nav-bar>
    <!-- 轮播图 -->
    <swiper-view :banners="banners"></swiper-view>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 特色信息   -->
    <feature-view></feature-view>
    <!--  商品选择项  -->
    <tab-control class="home-tab-control" :titles="goodTypeNames" @tabClick="tabClick"></tab-control>
    <!--  商品列表  -->
    <goods-list :goods="currentGoods"></goods-list>
  </div>
</template>

<script>

import SwiperView from "./children/SwiperView";
import RecommendView from "./children/RecommendView";
import FeatureView from "./children/FretureView"


import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";


import {getHomeMultiData, getHomeGoods} from "network/home";


export default {
  name: "Home",
  components: {
    SwiperView,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList
  },
  data(){
    return {
      goodTypeNames: [ '流行', '新款', '精选'],
      goodTypes: ['pop', 'new', 'sell'],
      banners: null,
      recommends: null,
      currentType: 'pop',
      goods: {
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]},
      }
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
  computed: {
    currentGoods(){
      let currentType = this.currentType
      return this.goods[currentType].list;
    }
  },
  methods: {
    /*选项卡点击事件监听*/
    tabClick(index){
      console.log(index);
      this.currentType = this.goodTypes[index];
    },
    getHomeMultiData(){
      getHomeMultiData().then(res=>{
        let data = res.data;
        this.banners = data.banner.list;
        this.recommends =data.recommend.list;
      })
    },
    getHomeGoods(type){
      let page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=> {
        //ES6  ...扩展运算符
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page  += 1;
      })
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*吸顶属性*/
  .home-tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
