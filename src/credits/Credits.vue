<template>
    <div class="credits">
      <div class="credits-text">
        <div>
          <p>Идея и правила игры: Bioware, LucasArts</p>
          <p>Реализация: iskopaem0e</p>
        </div>
        <div>
          <button v-on:click="returnToMenu" class="btn">Menu</button>
        </div>
      </div>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "Credits",
  setup(){
    let returnToMenu = inject('goToMenu');
    return {
      returnToMenu
    }
  }
}
</script>

<style scoped>
.credits{
  background-image: url("../assets/credits.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  color: white;

}

.credits-text{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  justify-content: space-between;
  background: rgba(0,0,0,0.4);
  font-size: xxx-large;
  font-weight: bolder;

}

.btn {
  text-align: center;
  color: white;
  font-weight: bolder;
  font-size: xxx-large;
  width: 40%;
  outline: 0;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}

.btn:active {
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.4);
}

</style>
