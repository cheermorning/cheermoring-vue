<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"></detail-nav-bar>
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
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
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
    }
  },
  created() {

    //获取详情数据
    this._getDetailData();

    //获取推荐数据
    this._getRecommendData();

  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    console.log('详情页mounted');
  },
  deactivated() {
    console.log('详情页deactivated');
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
        console.log(res);
        this.recommends = res.data.list;
      })
    },
    detailContentScroll(position) {
      //console.log(position)
      //回到顶部
      this.isShowBackTop = Math.abs(position.y) > 1500;
    },
    imageLoad() {
      this.$refs.scroll.localRefresh();
    },

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
