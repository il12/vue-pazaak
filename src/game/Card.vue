<template>
  <div v-on:dblclick="playThisCard" v-on:click.right="changeType" v-bind:class="classes.type" class="container">
    <span v-bind:class="classes.type" class="action"></span>
    <div v-bind:class="classes.type" class="value">
      {{ isHidden ? "" : value }}
    </div>
  </div>
</template>

<script>
import {computed, inject, watch, ref} from 'vue';

export default {
  name: "Card",
  props: {
    index: Number,
    value: Number,
    action: String,
    isHidden: Boolean,
    isChangeable: Boolean,
    isFrozen: Boolean
  },
  setup(props) {
    let action = ref(props.action);

    const playCard = inject('playCard');

    const setClass = (opts, action) => {
      if (opts.isHidden)
        return {
          type: 'hidden'
        }
      if (opts.isChangeable && action === 'minus')
        return {
          type: 'changeableMinus'
        }
      if (opts.isChangeable && action === 'plus')
        return {
          type: 'changeablePlus'
        }
      return {type: opts.action}
    }

    const changeType = () => {
      if (!props.isFrozen) {
        if (props.isChangeable) {
          if (action.value === 'plus') {
            action.value = "minus";
          } else if (action.value === 'minus') {
            action.value = 'plus';
          }
        }
      }
    }

    const playThisCard = () => {
      if (!props.isFrozen) {
        console.log('try to play card (card)')
        playCard(props.index, action);
      }
    }

    let classes = computed(() => setClass(props, action.value));

    watch(() => action, (state) => classes = setClass(props, state), {deep: true})

    return {
      classes,
      changeType,
      playThisCard
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1920px) {
  .action {
    position: relative;
    margin-top: -5px;
    margin-right: -70px;
    height: 20px;
    width: 20px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  .container {
    position: relative;
    display: block;
    margin: 0;
    width: 80px;
    height: 128px;
    border-top: 8px #d1985a solid;
    border-right: 8px #d1985a solid;
    border-left: 8px #d1985a solid;
    border-radius: 5px;
    text-align: center;
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    width: 100%;
    height: 30px;
    box-shadow: inset 0 0 0 1px darkslategray, inset 0 0 0 2px #d1985a;
    background-color: black;
    font-weight: bolder;
    color: white;
  }

  .container.hidden {
    color: lightgrey;
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    lightgrey;
  }

  .action.hidden {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    lightgrey;
  }

  .container.neutral {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    lawngreen;
  }

  .action.neutral {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    lawngreen;
  }

  .container.minus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    red;
  }

  .action.minus {
    background: linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    red;
  }

  .container.plus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    blue;
  }

  .action.plus {
    background: linear-gradient(to right, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    blue;
  }

  .container.changeableMinus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    linear-gradient(to bottom, red 30%, blue 30%, blue 60%, transparent 60%),
    linear-gradient(to right, red 50%, blue 50%);
  }

  .action.changeableMinus {
    background: linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    red;
  }

  .container.changeablePlus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    linear-gradient(to bottom, blue 30%, red 30%, red 60%, transparent 60%),
    linear-gradient(to right, red 50%, blue 50%);
  }

  .action.changeablePlus {
    background: linear-gradient(to right, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    blue;
  }
}

@media screen and (max-width: 1919px){
  .action {
    position: relative;
    margin-top: -10px;
    margin-right: -53px;
    height: 17px;
    width: 17px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  .container {
    position: relative;
    display: block;
    margin: 0;
    width: 60px;
    height: 96px;
    border-top: 6px #d1985a solid;
    border-right: 6px #d1985a solid;
    border-left: 6px #d1985a solid;
    border-radius: 5px;
    text-align: center;
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
    width: 100%;
    height: 23px;
    box-shadow: inset 0 0 0 1px darkslategray, inset 0 0 0 2px #d1985a;
    background-color: black;
    font-weight: bolder;
    color: white;
  }

  .container.hidden {
    color: lightgrey;
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    lightgrey;
  }

  .action.hidden {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    lightgrey;
  }

  .container.neutral {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    lawngreen;
  }

  .action.neutral {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    lawngreen;
  }

  .container.minus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    red;
  }

  .action.minus {
    background: linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    red;
  }

  .container.plus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    blue;
  }

  .action.plus {
    background: linear-gradient(to right, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    blue;
  }

  .container.changeableMinus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    linear-gradient(to bottom, red 30%, blue 30%, blue 60%, transparent 60%),
    linear-gradient(to right, red 50%, blue 50%);
  }

  .action.changeableMinus {
    background: linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    red;
  }

  .container.changeablePlus {
    background: linear-gradient(to bottom, transparent 60%, #d1985a 60%, #d1985a 75%, transparent 75%),
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7)),
    linear-gradient(to bottom, blue 30%, red 30%, red 60%, transparent 60%),
    linear-gradient(to right, red 50%, blue 50%);
  }

  .action.changeablePlus {
    background: linear-gradient(to right, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to bottom, transparent 45%, white 45%, white 55%, transparent 55%),
    linear-gradient(to right, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.78)),
    blue;
  }
}

</style>
