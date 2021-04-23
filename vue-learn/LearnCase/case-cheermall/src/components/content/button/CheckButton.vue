<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img class="check-img" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type: Boolean,
      default: true,
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #c6c5c5;
  }

  .check-img{
    width: 12px;
    height: 12px;
  }

  .checked{
    background-color: red;
    border-color: red;
  }
</style>
