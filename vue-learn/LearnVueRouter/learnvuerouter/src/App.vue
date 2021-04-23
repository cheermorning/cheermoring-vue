<template>
  <!-- to: 跳转到哪个组件
       tag: a标签和button标签
       replace: 防止浏览器可以退回-->
  <div id="app">
    <router-link to="/home" tag="Button" replace>首页</router-link>
    <router-link to="/about" tag="Button" replace>关于</router-link>
<!--    <router-link :to="'/user/'+ userId" tag="Button" replace>用户</router-link>
    <router-link :to="{path:'/profile', query:{user: info}}" tag="Button" replace>档案</router-link>-->
    <!--    <button @click="linkToHome">首页</button>
        <button @click="linkToAbout">关于</button>-->
    <button @click="linkToUser">用户</button>
    <button @click="linkToProfile">档案</button>

    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      userId: 'wangwu',
      info: [
        {name: 'WEY', age: '18', height: '1.88'},
        {name: 'TSLA', age: '12', height: '1.99'}
      ],

    }
  },
  methods: {
    linkToHome() {
      this.$router.replace('/home')
    },
    linkToAbout() {
      this.$router.replace('/about')
    },
    linkToUser(){
      //console.log(this.$router);
      this.$router.replace('/user/' + this.userId);
    },
    linkToProfile(){
      this.$router.replace({
        path: '/profile',
        query: {
          user: this.info
        }
      })
    }
  }
}
</script>

<style>


.active {
  color: brown;
}
</style>
