<template>
  <div class="name">
    {{name}}
  </div>
</template>

<script>
export default {
  name: "PlayerName",
  props:{
    name
  }
}
</script>

<style scoped>
.name{
  width: 50%;
  color: white;
  font-weight: bolder;
  font-size: larger;
}
</style>
