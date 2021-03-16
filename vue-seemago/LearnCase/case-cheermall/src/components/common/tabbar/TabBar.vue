<template>
  <div class="tab-bar">
    <slot name="tabBarItem"></slot>
  </div>
</template>

<script>
export default {
name: "TabBar"
}
</script>

<style scoped>
.tab-bar{
  /*布局和背景*/
  display: flex;
  background-color: #f6f6f6;

  /*定位*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /*阴影线*/
  box-shadow: 0 -2px 1px rgba(100,100,100,.09);
}


</style>
