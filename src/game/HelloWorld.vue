<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ time }}</h2>
  </div>
</template>

<script>
import {onBeforeUnmount,ref} from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const time = ref(new Date());
    const updateCurrentTime = () => { time.value = new Date(); };
    const intervalHandle = setInterval(updateCurrentTime, 1000);
    onBeforeUnmount(() => { clearInterval(intervalHandle); });
    return {
      time
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
