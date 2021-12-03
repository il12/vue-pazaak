<template>
  <div class="circle">
    {{score}}
  </div>
</template>

<script>
export default {
  name: "PlayerScore",
  props: {
    score: Number
  }
}
</script>

<style scoped>
  .circle{
    color: white;
    font-weight: bolder;
    font-size: larger;
    width: 25%;
    border-radius: 25%;
  }
</style>
