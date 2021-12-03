<script>
import {h, toRefs} from "vue";
import Card from "@/game/Card";

export default {
  name: "PlayerHand",
  props: {
    cards: Array,
    isActive: Boolean,
    isBot: Boolean
  },
  setup(props) {
    const hand = toRefs(props);
    return ()=>h(
        `div`,
        {class: `grid`},
        [...hand.cards.value.map(
            (item, index) => {
              if (hand.isActive.value)
                return h(Card, {key: index+item.action,index: index, value: item.value, action: item.action, isChangeable: item.isChangeable, isHidden: hand.isBot.value});
              return h(Card, {key: index+item.action, value: item.value, action: item.action, isHidden: true, isChangeable: false})
            }
        ), ...([1, 2, 3, 4].map(
            () => {
              return h(`div`, {class: `field`})
            }
        ))].slice(0, 4)
    )
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 15px;
  border: 10px solid rgba(0,0,0,0.0);
  border-radius: 10px;
  place-items: center;
}

@media screen and (min-width: 1920px) {
  .field {
    width: 98px;
    height: 138px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
  }
}
@media screen and (max-width: 1919px){
  .field {
    width: 74px;
    height: 104px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
  }
}
</style>
