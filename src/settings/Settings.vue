<template>
  <div class="settings">
    <div class="players">
      <div class="list">
        <div @click="changeNumber" class="left-arrow"></div>
        <div :class="settings.isSingle ? '' :'hidden'">Single player</div>
        <div :class="!settings.isSingle ? '' :'hidden'">Two players</div>
        <div @click="changeNumber" class="right-arrow"></div>
      </div>
      <div class="player-names">
        <div class="row">
          <label>Your name:
            <input class="input" v-model="settings.players.player1.name" type="text"/>
          </label>
        </div>
        <div class="row" :class="settings.isSingle ? 'hidden' :''">
          <label>Your opponent:
            <input class="input" v-model="settings.players.player2.name" type="text"/>
          </label>
        </div>
        <div :class="!settings.isSingle ? 'hidden' : ''">
          <label for="your-opponent">Your opponent:</label>
          <div class="row">
            <div @click="moveEasier" class="left-arrow"></div>
            <div class="list">
              <input id="your-opponent" disabled class="input" v-model="settings.players.player2.name" type="text"/>
            </div>
            <div @click="moveHarder" class="right-arrow"></div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button v-on:click="save" class="btn">Save</button>
        <button v-on:click="returnToMenu" class="btn">Menu</button>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, reactive} from "vue";
import Player from '@/IPlayer'
import getPlayerDeck from "@/getPlayerDeck";

export default {
  name: "Settings",
  setup: function () {
    let playerDeck = getPlayerDeck()
    const bots = [
      new Player('Niklas', playerDeck, true),
      new Player('Savam Tun', playerDeck, true),
      new Player('Avner', playerDeck, true)
    ];
    let settings = reactive({
      isSingle: true,
      players: {
        player1: new Player('You', playerDeck, false),
        player2: bots[0],
      },
      changeNumber(newValue) {
        this.isSingle = newValue;
      },
      changePlayer(newValue) {
        this.players.player2 = newValue;
      },
    })

    const changeNumber = () => {
      if (!settings.isSingle) {
        settings.changePlayer(Object.assign({}, bots[0]));
      } else {
        settings.changePlayer(new Player('Opponent', playerDeck, false))
      }
      settings.changeNumber(!settings.isSingle);
    }

    const moveHarder = () => {
      let currentOpponent = bots.findIndex((item) => JSON.stringify(settings.players.player2) == JSON.stringify(item));
      if (currentOpponent < bots.length - 1 && currentOpponent !== -1) {
        let nextOpponent = Object.assign({}, bots[currentOpponent + 1]);
        settings.changePlayer(nextOpponent);
      }
    }

    const moveEasier = () => {
      let currentOpponent = bots.findIndex((item) => JSON.stringify(settings.players.player2) == JSON.stringify(item));
      if (currentOpponent > 0) {
        let previousOpponent = Object.assign({}, bots[currentOpponent - 1]);
        settings.changePlayer(previousOpponent);
      }
    }

    const save = () => {
      localStorage.setItem('settings', JSON.stringify(settings))
      returnToMenu();
    }

    const returnToMenu = inject('goToMenu');
    return {
      returnToMenu,
      settings,
      changeNumber,
      moveEasier,
      moveHarder,
      save
    }
  }
}
</script>

<style scoped>
.settings {
  background-image: url("../assets/credits.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  color: white;
}

.players {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  justify-content: space-between;
  font-size: xxx-large;
  font-weight: bolder;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.row {
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.left-arrow {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-right: 50px solid rgba(0, 0, 0, 0.7);
  border-bottom: 25px solid transparent;
}

.right-arrow {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-left: 50px solid rgba(0, 0, 0, 0.7);
  border-bottom: 25px solid transparent;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.input {
  text-align: center;
  color: white;
  font-weight: bolder;
  font-size: xxx-large;
  outline: 0;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0);
}

.hidden {
  display: none;
}

</style>
