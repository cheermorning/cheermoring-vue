<template>
  <div>
    <h3>我是首页</h3>
    <p>我是首页内容，哈哈哈哈</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      path: '/home/news'
    }
  },
  created() {
    console.log('home created');
  },
  destroyed() {
    console.log('home destroyed');
  },
  //这两个函数必须在有keep-alive标签时才能使用
  activated(){
    // console.log('activated');
    this.$router.replace(this.path);
  },
  // deactivated(){
  //   // console.log('deactivated');
  //
  // },
  // beforeRouteEnter: (to, from, next) => {
  //   console.log('home beforeRouteEnter')
  // },
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path)
    this.path = this.$route.path;
    next()
  }
}
</script>

<style scoped>

</style>