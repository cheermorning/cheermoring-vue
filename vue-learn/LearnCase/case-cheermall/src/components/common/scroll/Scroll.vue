<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'

BScroll.use(PullUp)

export default {
  name: "Scroll",
  props: {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      bscroll: null,
    }
  },
  mounted() {
    this.initBScroll();
  },
  methods:{
    /*滚动*/
    initBScroll() {
      this.$nextTick(() => {
        // console.log("我已经点击滚动了")
        this.bscroll = new BScroll(this.$refs.scroll, {
          //click为true对div标签的点击有效，为false对div标签的点击会失效
           click: true,
          //启动上拉加载
           pullUpLoad: this.pullUpLoad,
          //决定是否派发scroll事件
          probeType: this.probeType,

        })
        if(
          this.probeType ===2 || this.probeType ===3
        ) {
          this.bscroll.on('scroll', (position) => {
            this.scrollHandler(position)
          })
        }
        if(this.pullUpLoad) {
          this.bscroll.on('pullingUp', this.pullingUpHandler)
        }
      })

    },
    async scrollHandler(position){
      this.$emit('scroll', position);
    },
    async pullingUpHandler() {
      this.$emit('pullingUp', );
    },
    async scrollTo(x,y, time=500){
      //为了确保bscroll对象有值，增加逻辑与判断
      this.bscroll && this.bscroll.scrollTo(x,y,time);
    },
    async finishPullUp(){
      this.bscroll && this.bscroll.finishPullUp();
    },
    async localRefresh(){
      this.bscroll && this.bscroll.refresh()
    },
    async getScrollY(){
      return this.bscroll ? this.bscroll.y : 0;
    }
  }
}
</script>

<style scoped>

</style>
