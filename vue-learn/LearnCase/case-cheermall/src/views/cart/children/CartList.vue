<template>
  <div class="cart-list">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import {mapState} from 'vuex'
export default {
name: "CartList",
  components: {CartListItem},
  computed:{
    ...mapState([
      'cartList'
             ])
  },
  methods:{

  }
}
</script>

<style scoped>

  .cart-list{
    height: 100%;
  }

</style>
