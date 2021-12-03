<template>
  <div class="container">
    <div class="flex-row info">
      <LeftInfo :player="gameState.player1"/>
      <RightInfo :player="gameState.player2"/>
    </div>
    <div class="flex-row fields">
      <div class="flex-row" :class="gameState.setWinner ? 'invisible' : gameState.gameWinner ? 'invisible' : ''">
        <SetCounter :wins="gameState.player1.rounds"/>
        <Field :cards="gameState.player1.usedCards"/>
        <Field :cards="gameState.player2.usedCards"/>
        <SetCounter :wins="gameState.player2.rounds"/>
      </div>
      <div class="new-round" v-if="gameState.gameWinner">
        <div>
          Congratulations, {{ gameState.gameWinner }}!
          You are the WINNER!
        </div>
        <button v-on:click="returnToMenu" class="btn">Menu</button>
      </div>
      <div class="new-round" v-else-if="gameState.setWinner === 'draw'">
        <div>
          This set is draw
        </div>
        <button v-on:click="gameState.newSet" class="btn">Next round</button>
      </div>
      <div class="new-round" v-else-if="gameState.setWinner">
        <div>
          This set winner is {{ gameState.setWinner }}
        </div>
        <button v-on:click="gameState.newSet" class="btn">Next round</button>
      </div>
    </div>
    <div class="flex-row hands">
      <div class="flex-row">
        <PlayerHand
            :key="gameState.player1"
            :cards="gameState.player1.hand"
            :isActive="gameState.player1.isActive"
            :isBot="gameState.player1.isBot"
        />
        <PlayerHand
            :key="gameState.player2"
            :cards="gameState.player2.hand"
            :isActive="gameState.player2.isActive"
            :isBot="gameState.player2.isBot"
        />
      </div>
    </div>
    <div class="flex-row buttons">
      <button :disabled="gameState.isSetEnd || gameState.currentPlayer.isBot" v-on:click="gameState.endTurn"
              class="btn">End Turn
      </button>
      <button :disabled="gameState.isSetEnd || gameState.currentPlayer.isBot" v-on:click="gameState.stand" class="btn">
        Stand
      </button>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import Field from "./Field"
import State from "../IGame";
import LeftInfo from "./LeftInfo";
import RightInfo from "./RightInfo";
import PlayerHand from "./PlayerHand";
import SetCounter from "./SetCounter";
import {provide, inject} from 'vue'
import Player from "@/IPlayer";
import getPlayerDeck from "@/getPlayerDeck";

export default {
  name: 'Game',
  components: {
    SetCounter,
    Field,
    LeftInfo,
    RightInfo,
    PlayerHand
  },
  setup() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let gameState;
    if (settings !== null) {
      gameState = reactive(new State(settings.players.player1, settings.players.player2));
    } else {
      gameState = reactive(new State(new Player('You', getPlayerDeck(), false,), new Player('Opponent', getPlayerDeck(), true)));
    }
    gameState.newSet();
    const playCard = (index, action) => {
      gameState.playCard(index, action);
    }
    provide('playCard', playCard)
    const returnToMenu = inject('goToMenu')
    return {
      gameState,
      returnToMenu
    };
  }
}
</script>

<style scoped>
.container {
  margin: 10px;
  width: 70%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  width: 80%;
  border: 1px rgba(0, 0, 0, 0.4) solid;
  border-radius: 25px;
  justify-content: center;
}

.flex-row {
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.fields {
  position: relative;
  gap: 20px;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-left: 3px rgba(0, 0, 0, 0.4) double;
  border-right: 3px rgba(0, 0, 0, 0.4) double;
  border-top: 3px rgba(0, 0, 0, 0.4) double;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.hands {
  gap: 20px;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-top: 3px rgba(0, 0, 0, 0.4) double;
  border-left: 3px rgba(0, 0, 0, 0.4) double;
  border-right: 3px rgba(0, 0, 0, 0.4) double;
  border-bottom: 3px rgba(0, 0, 0, 0.4) double;
  border-radius: 25px;
}

.buttons {
  width: 50%;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-left: 1px rgba(0, 0, 0, 0.4) solid;
  border-right: 1px rgba(0, 0, 0, 0.4) solid;
  border-bottom: 1px rgba(0, 0, 0, 0.4) solid;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.btn {
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

.btn:disabled {
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

.new-round {
  color: white;
  font-weight: bolder;
  font-size: larger;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.invisible {
  visibility: hidden;
}

@media screen and (max-width: 1440px) {
  .hands {
    gap: 10px;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border-top: 3px rgba(0, 0, 0, 0.4) double;
    border-left: 3px rgba(0, 0, 0, 0.4) double;
    border-right: 3px rgba(0, 0, 0, 0.4) double;
    border-bottom: 3px rgba(0, 0, 0, 0.4) double;
    border-radius: 5px 5px 25px 25px;
  }
}
</style>
