<template>
  <div v-bind:class="{ active: player.isActive && !player.isFinished }" class="info-container">
    <PlayerName :name="player.name"/>
    <PlayerScore :score="player.score"/>
  </div>
</template>

<script>
import PlayerScore from "@/game/PlayerScore";
import PlayerName from "@/game/PlayerName";

export default {
  name: "RightInfo",
  components: {
    PlayerScore,
    PlayerName,
  },
  props:{
    player: Object
  }
}
</script>

<style scoped>
.info-container{
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  width: 50%;
  display: flex;
  flex-direction: row;
  gap: 10px
}
.active{
  background: rgba(255,0,0,0.4);
}
</style>
