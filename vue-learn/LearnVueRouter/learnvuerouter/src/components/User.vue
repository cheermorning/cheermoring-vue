<template>
  <div>
    <h1>我是用户界面</h1>
    <p>我是用户界面的内容，嘿嘿嘿嘿</p>
    <h2>{{ userId }}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    userId() {
      //console.log(this.$route);
      return this.$route.params.userId
    }
  },
  created() {
    console.log("User created")
  },
  destroyed() {
    console.log("User destroyed")
  },
  //组件内守卫
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 通过 `vm` 访问组件实例
      //console.log(vm)
    })
  }
}
</script>

<style scoped>

</style>