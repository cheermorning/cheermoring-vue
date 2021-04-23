<template>
  <div v-if="isNotEmpty" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in list" :key="index" :src="item" alt="" @load="imageLoad">
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data(){
    return {
      desc: "",
      key: "",
      list: [],
      counter: 0,
      listLength:0
    }
  },
  props:{
    detailInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  mounted() {

  },
  computed:{
    isNotEmpty() {
      return Object.keys(this.detailInfo).length !== 0
    },
  },
  methods:{
    imageLoad(){
      if(++this.counter === this.listLength){
        this.$emit("imageLoad");
      }
    }
  },
  watch:{
    detailInfo:{
      handler(newVal,oldVal){
        let imageInfo = this.detailInfo.detailImage[0];
        this.desc = this.detailInfo.desc;
        this.key = imageInfo.key;
        this.list = imageInfo.list;
        this.listLength = imageInfo.list.length;
      },
      deep: true
    }

  }
}
</script>

<style scoped>
  .goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc{
    padding: 0 15px;
  }

  .info-desc .start , .info-desc .end{
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start{
    float: left;
  }

  .info-desc .end{
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
