<template>
  <div>
    <button @click="addStudent">添加学生</button>
    <h2>{{count}}</h2>
    <h3>{{$store.getters.gt20Stu}}</h3>
    <h4>{{$store.getters.gt20StuLen}}</h4>
    <h5>{{$store.getters.gtAgeStu(18)}}</h5>
  </div>
</template>

<script>
import {ADD_STUDENT} from '@store/mutations-types'
export default {
name: "Counter",
  props:{
    count: {
      type: Number
    }
  },
  methods:{
    addStudent(){
      const stu = {id:115, name:'curry', age: 21};
      this.$store.commit(ADD_STUDENT, stu);
    }
  }
}
</script>

<style scoped>

</style>