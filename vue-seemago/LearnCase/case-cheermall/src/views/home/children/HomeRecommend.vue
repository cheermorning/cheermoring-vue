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
    font-size: 0.75rem;

    padding: 0.625rem 0 1.25rem 0;
    border-bottom: 10px solid #eee;

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
