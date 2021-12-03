<template>
  <div id="app">
    <div v-if="router.target === 'menu'" class="screen">
      <div  class="menu">
        <button v-on:click="startGame" class="btn">New game</button>
        <button v-on:click="changeSettings" class="btn">Settings</button>
        <button v-on:click="showCredits"  class="btn">Credits</button>
      </div>
    </div>
    <Game v-if="router.target === 'game'"/>
    <Credits v-if="router.target === 'credits'" class="screen"/>
    <Settings v-if="router.target === 'settings'" class="screen"/>
  </div>
</template>

<script>
import Game from "./game/Game"
import Credits from "./credits/Credits";
import {reactive, provide} from "vue";
import Settings from "./settings/Settings";

export default {
  name: 'App',
  components: {
    Credits,
    Settings,
    Game
  },
  setup() {
    const router = reactive({
      target: "menu",
      setTarget(newTarget) {
        this.target = newTarget;
      }
    })

    const goToMenu = () => {
      router.setTarget('menu')
    }
    const startGame = () => {
      router.setTarget('game')
    }
    const showCredits = () => {
      router.setTarget('credits');
    }
    const changeSettings = () => {
      router.setTarget('settings');
    }
    provide('goToMenu', goToMenu)
    return {
      router,
      startGame,
      showCredits,
      changeSettings
    }

  }

}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  overflow: hidden;
  background-image: url("./assets/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.screen{
  margin: 10px;
  width: 70%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu {
  padding: 10px;
  gap: 10px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  text-align: center;
  color: white;
  font-weight: bolder;
  font-size: larger;
  height: 50px;
  width: 40%;
  outline: 0;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.btn:active {
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.4);
}

</style>
