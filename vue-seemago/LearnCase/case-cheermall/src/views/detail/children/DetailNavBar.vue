<template>
  <nav-bar>
    <div slot="nav-left" class="back">
      <img src="~assets/img/common/back.svg" alt="" @click="backClick">
    </div>
    <div slot="nav-center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="itemClick(index)"
      >
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return {
      titles: ['商品','参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
  }

  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

  .back{
    font-size: 12px;
    margin-top: 7px;
  }

</style>
