<template>
  <div class="nav-bar">
    <div class="left"><slot name="nav-left"></slot></div>
    <div class="center"><slot name="nav-center"></slot></div>
    <div class="right"><slot name="nav-right"></slot></div>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>

  .nav-bar{
    display: flex;
    /*background-color: #FF5777;*/
    height: 44px;
    line-height: 44px;
    text-align: center;
    vertical-align: middle;
    box-shadow: 0 -2px 1px rgba(100,100,100, .1);
  }

  .left, .right {
    width: 60px;
  }

  .center{
    flex: 1;
  }

</style>
