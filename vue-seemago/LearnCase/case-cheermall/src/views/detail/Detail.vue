<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./children/DetailNavBar";
  import DetailSwiper from "./children/DetailSwiper";
  import DetailBaseInfo from "./children/DetailBaseInfo";
  import DetailShopInfo from "./children/DetailShopInfo";
  import DetailGoodsInfo from "./children/DetailGoodsInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop} from "network/detail";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
  },
  data(){
    return {
      iid : null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{}
    }
  },
  created() {
    //获取iid
    this.iid = this.$route.params.iid

    //获取数据
    getDetail(this.iid).then((res)=>{
      console.log(res);
      let data = res.result;
      //1. 获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      //2. 获取商品基本信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.获取商品信息
      this.detailInfo = data.detailInfo;
    })
  },
    methods:{
      imageLoad(){
        this.$refs.scroll.localRefresh();
      }
    }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-content{
    height: calc(100% - 44px);
  }
</style>
