<template>
  <div class="toast" v-if="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000){
      // console.log("------")
      this.message = message;
      this.isShow = true;

      setTimeout(()=>{
        this.isShow = false;
      },duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, .75);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: show-toast .2s;
  color: #FFFFFF;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 99;
}

@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;

  }
}

</style>
