<template>
  <div class="global-toast"
       :class="type"
        v-if="showToast"
  >
    <span class="icon">
      <img :src="iconSrc" alt="">
      {{message}}
    </span>
  </div>
</template>

<script>
export default {
name: "GlobalToast",
  data(){
  return{
    showToast:false,
    type: "normal",
    message: "消息",
    duration: 2000,
  }
  },
  computed:{
    iconSrc(){
      let tipType = ['normal', 'success', 'warning', 'fail'];
      if(tipType.includes(this.type)){
        return require(`assets/img/toast/${this.type}.svg`)
      }else{
        return require(`assets/img/toast/normal.svg`)
      }
    }
  },
}
</script>

<style scoped>
.global-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgb(233, 233, 235);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: show-toast .2s;
  color: #909399;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 999;
}

@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.success {
  color: #67C23A;
  background: rgb(225, 243, 216);
}

.warning {
  color: #E6A23C;
  background: rgb(250, 236, 216);
}

.fail {
  color: #F56C6C;
  background: rgb(253, 226, 226);
}

.icon img {
  width: 15px;
  height: 15px;
  margin-top: 5px;
  margin-right: 2px;
}
.icon{
  text-align: center;
}
</style>
