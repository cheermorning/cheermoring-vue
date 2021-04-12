import {debounce} from "./util";

export const itemListenerMixin = {
  data(){
    return {
      itemImageListener: null,
     // newRefresh: null,
    }
  },
  mounted(){
    //console.log('混入mounted');
    let newRefresh = debounce(this.$refs.scroll.localRefresh, 200, false);
    this.itemImageListener = function(){
      newRefresh();
    }
    //监听图片加载完成,因为在生命周期函数created中this.$refs可能拿到的值为undefined，所以在mounted中处理
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  deactivated() {
    //2. 取消home的事件监听（全局）
    //console.log('混入deactivated');
    this.$bus.$off('itemImageLoad', this.itemImageListener);
  }
}

export const backTopMixin = {
  methods:{
    /*回到顶部点击事件监听，@click.native可以作为组件的点击事件，也就是要想点击组件，必须加native*/
    backTopClick(){
      let scroll = this.$refs.scroll;
      //console.log("混入" + scroll.bscroll);
      scroll.scrollTo(0,0);
    },
  }
}
