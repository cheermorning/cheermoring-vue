<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  .tab-bar {
    /*布局，和背景*/
    display: flex;
    background-color: #f6f6f6;

    /*定位让tabbar在下面*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*阴影线*/
    box-shadow: 0 -2px 1px rgba(100, 100, 100, .08);
  }

</style>

<!--
  TabBar组件总结：
  1. 创建一个底部插槽，包裹多个TabBarItem组件
-->
