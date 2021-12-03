<template>
  <div class="counter container">
    <div v-bind:class="winsArray[0]" class="round"></div>
    <div v-bind:class="winsArray[1]" class="round"></div>
    <div v-bind:class="winsArray[2]" class="round"></div>
  </div>
</template>
<script>
import {computed} from "vue";
export default {
  name: "SetCounter",
  props: {
    wins: Number
  },
  setup(props){
    let winsArray = computed(()=> {
      let arr = [false, false, false]
      for (let i = 0; i < props.wins; i++) {
        arr[i] = "win";
      }
      return arr;
    });
    return {winsArray};
  }
}
</script>

<style scoped>
  .container.counter{
    justify-content: start;
  }
  .round{
    margin: 10px;
    content: "";
    background: radial-gradient(circle at center, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 50%);
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .win {
    background: radial-gradient(circle at center, red 50%, rgba(0,0,0,0.3) 50%);
  }
</style>
