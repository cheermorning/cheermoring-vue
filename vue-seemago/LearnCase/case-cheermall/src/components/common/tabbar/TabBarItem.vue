<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: '#FF5777'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    },
  },
}
</script>

<style scoped>
.tab-bar-item {
  /*均等分flex*/
  flex: 1;
  text-align: center;
  height: 3rem;
  font-size: .875rem;

}

.tab-bar-item img {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 1px;
}
</style>
