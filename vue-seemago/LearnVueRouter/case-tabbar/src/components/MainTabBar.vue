<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="red">
      <img slot="item-icon" src="@assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="@assets/img/tabbar/home_active.svg">
      <div slot="item-next">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="@assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="@assets/img/tabbar/category_active.svg">
      <div slot="item-next">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="@assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="@assets/img/tabbar/shopcart_active.svg">
      <div slot="item-next">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="@assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="@assets/img/tabbar/profile_active.svg">
      <div slot="item-next">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "@components/tabbar/TabBar";
import TabBarItem from "@components/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>

<!--
  MainTabBar组件总结：
  1. 为了App.vue代码简洁，特意封装该组件
  2. 需要向TabBarItem传入两个属性 path/active-color(组件内有默认值，可以不传)
-->
