<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-next"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: '#FF5777'
    }
  },
  data() {
    return {
      //isActive: true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods:{
    itemClick(){
      // console.log('itemClick');
      this.$router.replace(this.path)
    }
  },
}
</script>

<style scoped>
.tab-bar-item {
  /*高度， flex等分， 居中显示*/
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 1px;
}
</style>

<!--

  TabBarItem组件总结：
  1. TabBarItem组件主要包含三个插槽，普通图片插槽，活跃图片插槽，文本插槽；
  2. 控制显示哪张图片的代码实现isActive：在计算属性中，通过props，父组件向子组件传递path数据，获取点击的view路由，然后再根据当前活跃路由与view路由对比， this.$route.path.indexOf(this.path) !== -1;
  3. 控制文本颜色的代码实现：根据isActive判断是否给文本插槽添加style样式
-->
