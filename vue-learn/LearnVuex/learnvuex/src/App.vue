<template>
  <div id="app">
<!--  App Module化处理  -->
    <div>
      <h2>{{$store.state.a.name}}</h2>
      <h2>{{name1}}</h2>
      <h2>{{name2}}</h2>
      <h2>{{name3}}</h2>
      <button @click="updateName('yinchen')">修改名称</button>
      <button @click="asyncUpdateName">异步修改名称</button>
    </div>
    <hr>
<!--  App Module化处理  -->
<!--  App响应式处理  -->
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">修改信息</button>
<!--  App响应式处理  -->
    <hr>
    <h2>{{counter}}</h2>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addStep(5)">+5</button>
    <button @click="addStepSS(15)">+15</button>
<!-- Counter组件   -->
    <hr>
    <counter :count="counter"></counter>
    <hr>
    <v-model></v-model>
  </div>
</template>

<script>
//mapState辅助函数
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import Counter from "./components/Counter";
  import VModel from "./components/VModel";
  import * as types from "./store/mutations-types"
export default {
  name: 'App',
  components: {
    Counter,
    VModel
  },
  data(){
    return {
    }
  },
  //vuex mapState辅助函数
  /*computed: mapState({
    //箭头函数
    counter: state=> state.counter,
    //或者重新定义字符串参数
    getCounter: 'counter',
    //常规方法
    localCounter(state){
      return state.counter
    }
  }),*/
  computed: {
    ...mapState([
      'counter'
  ]),
    ...mapGetters([
      'name1',
      'name2',
      'name3'
    ])
  },
  methods:{
    ...mapMutations({
      add: types.INCREMENT,
      sub: types.DECREMENT,
      addStep: types.INCREMENT_BY_STEP,
      updateName: types.UPDATE_NAME
    }),

    // add(){
    //   this.$store.commit(types.INCREMENT);
    // },
    // sub(){
    //   this.$store.commit(types.DECREMENT)
    // },

    // addStep(step){
    //   //Mutation普通提交风格
    //   this.$store.commit(types.INCREMENT_BY_STEP, step);
    // },
    addStepSS(step){
      //Mutation特殊提交风格
      this.$store.commit({
        type: types.INCREMENT_BY_STEP_SS,
        step
      })
    },
    updateInfo(){
      /*this.$store.commit({
        type: types.UPDATE_INFO
      })*/
      //相当于返回Promise的结果： Actions的异步方法使用dispatch
      this.$store.dispatch(types.A_UPDATE_INFO, '你好呀').then(res => {
        console.log(res);
      })
    },
    // updateName(){
    //   this.$store.commit(types.UPDATE_NAME, 'yinchen'+ Math.floor((Math.random()*10)))
    // },
    asyncUpdateName(){
      this.$store.dispatch(types.A_UPDATE_NAME, 'wangzhe').then(res => {
        console.log(res)
      });
    },

    // ...mapActions({
    //   updateInfo: types.A_UPDATE_INFO,
    //
    // })
  },
}
</script>

<style>
</style>
