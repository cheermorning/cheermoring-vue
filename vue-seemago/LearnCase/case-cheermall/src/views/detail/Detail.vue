<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-content"
            ref="scroll"
            :probe-type="3"
            @scroll="detailContentScroll"
    >
      <div class="detail-goods" ref="goods">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      </div>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "./children/DetailSwiper";
import DetailBaseInfo from "./children/DetailBaseInfo";
import DetailShopInfo from "./children/DetailShopInfo";
import DetailGoodsInfo from "./children/DetailGoodsInfo";
import DetailParamInfo from "./children/DetailParamInfo";
import DetailCommentInfo from "./children/DetailCommentInfo";


import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import {debounce} from "common/util";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    BackTop,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      isShowBackTop: false,
      itemImageListener: null,
      navTopYs:[],
      getTopYs: null,
      currentIndex: 0,

    }
  },
  created() {
    //获取详情数据
    this._getDetailData();

    //获取推荐数据
    this._getRecommendData();

    //防抖处理点击标题切换数据
    this.getTopYs = debounce(()=>{
      this.navTopYs.push(0);
      this.navTopYs.push(this.$refs.param.$el.offsetTop);
      this.navTopYs.push(this.$refs.comment.$el.offsetTop);
      this.navTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.navTopYs.push(Number.MAX_VALUE);
      console.log(this.navTopYs);
    }, 200)

  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    //console.log('详情页mounted');
  },
  deactivated() {
    //console.log('详情页deactivated');
  },
  methods: {
    _getDetailData(){
      //获取iid
      this.iid = this.$route.params.iid
      getDetail(this.iid).then((res) => {
        // console.log(res);
        let data = res.result;
        //1. 获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        //2. 获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //4.获取商品信息
        this.detailInfo = data.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    _getRecommendData(){
      getRecommend().then(res => {
        //console.log(res);
        this.recommends = res.data.list;
      })
    },
    detailContentScroll(position) {
      //console.log(position)
      const positionY = Math.abs(position.y);
      //[0, 12720, 13649, 13960, Number.MAX_VALUE __ob__: Observer]
      // 0-12720 index=0
      // 12720-13649 index=1
      // 13649-13960 index=4
      // 13960-最大值 index=3
      //滑动页面，顶部标题改变
      let length = this.navTopYs.length;
      /*for(let i=0; i<length;i++){
        if(this.currentIndex !== i
          && ((
            i < length -1
            && positionY > this.navTopYs[i]
            && positionY < this.navTopYs[i+1])
          || (i === length -1
            && positionY > this.navTopYs[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }*/
      //for循环优化处理
      for(let i=0; i < length-1; i++){
        if(this.currentIndex !== i && (
          positionY >= this.navTopYs[i]
          && positionY < this.navTopYs[i+1]
        )){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //回到顶部
      this.isShowBackTop = positionY > 1500;
    },
    imageLoad() {
      this.$refs.scroll.localRefresh();

      this.getTopYs()
    },
    titleClick(index){
      console.log(index);
      //点击顶部标题驱动页面滑动
      this.$refs.scroll.scrollTo(0, -this.navTopYs[index], 200);
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-content {
  height: calc(100% - 44px);
}
</style>
