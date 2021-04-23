<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="nav-center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--购物车列表-->
    <scroll
      class="cart-content"
      ref="scroll"
      :probe-type="3"
    >
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./children/CartList";
import CartBottomBar from "./children/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  activated() {
    this.$refs.scroll.localRefresh();
    //console.log('home activated');
  },
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;

}

.cart-content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
