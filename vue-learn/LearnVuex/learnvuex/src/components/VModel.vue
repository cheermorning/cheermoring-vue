<template>

  <div>
<!--    <input :value="message" @input="updateMessage">-->
    <input type="text" v-model="message">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {UPDATE_NAME} from '../store/mutations-types'
export default {
name: "VModel",
  //第一种方法
/*  computed:{
    ...mapState({
      message: state => state.a.name
    })
  },
  methods:{
    updateMessage(e){
      this.$store.commit(UPDATE_NAME, e.target.value)
    }
  }*/
  //第二种方法
  computed:{
    message: {
      get(){
        return this.$store.state.a.name
      },
      set(value){
        this.$store.commit(UPDATE_NAME, value)
      }
    }
  }
}
</script>

<style scoped>

</style>

<!--
严格模式下的表单处理：https://vuex.vuejs.org/zh/guide/forms.html
-->
