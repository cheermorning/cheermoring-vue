<template>
  <div class="home-recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div v-text="item.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type : Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .home-recommend{
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eeeeee;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    width: 68px;
    height: 68px;
    margin-bottom: 10px;
  }
</style>
