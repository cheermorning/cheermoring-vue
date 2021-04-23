<template>
  <div id="pro">
    <h2>我是Profile组件</h2>
    <p>{{userId}}</p>
    <div>
      <table border="1">
        <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>身高</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in $route.query.user">
          <td v-for="i in item">{{ i }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed:{
    userId(){
      console.log(this.$route);
      return '你好'
    }
  },
  created(){
    console.log("Profile created")
  },
  destroyed(){
    console.log("Profile destroyed")
  }
}
</script>

<style scoped>

thead {
  color: green
}

tbody {
  color: blue;
  height: 50px
}

</style>