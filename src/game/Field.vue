<script>
import {h} from 'vue';
import Card from "./Card";

export default {
  name: "Field.vue",
  props: {
    cards: Array
  },
  render(){
    const cardComponents = h(
        `div`,
        {class: `grid`},
        [...this.cards.map(
            (item)=>{
              return h(Card,{value: item.value, action: item.action, isChangeable: item.isChangeable, isFrozen: true})
            }
        ), ...([1,2,3,4,5,6,7,8,9].map(
            ()=>{
              return h(`div`,{class: `field`})
            }
        ))].slice(0,9)
    )
    return cardComponents
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px 10px;
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
