<template>
  <div
    ref="card"
    class="card"
    :class="{
      'open': flipped,
    }"
    @click="flip"
  >
    <div class="card__face card__face--front">
      <slot name="question" />
    </div>

    <div class="card__face card__face--back">
      <slot name="answer" />
    </div>

    <div class="overlay">
      <slot name="overlay" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Interact
import interact from "interactjs";
import { Target } from '@interactjs/types';

// Vue
import { ref, watch, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'


/* -------------------------------------------------------------------------- */
/*                            Component interfaces                            */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  index: number,
  swipeThreshold: number,
}>()
const emit = defineEmits(['swiped', 'swiping'])


/* -------------------------------------------------------------------------- */
/*                          Component internal state                          */
/* -------------------------------------------------------------------------- */

const card = ref()

const flipped = ref<boolean>(false)
const posX = ref<number>(0)
const posY = ref<number>(0)
const angle = ref<number>(0)
const scale = ref<number>(.95)

const distance = computed<number>(function () {
  const xaxis = Math.abs(posX.value) > Math.abs(posY.value)
  const value = xaxis ? posX.value : posY.value
  if (value > props.swipeThreshold) { return value - props.swipeThreshold }
  if (value < -props.swipeThreshold) { return value + props.swipeThreshold }
  return 0;
})
const direction = computed<string>(function () {
  const xaxis = Math.abs(posX.value) > Math.abs(posY.value)
  return (
     xaxis && posX.value > 0 ? "right"  :
     xaxis && posX.value < 0 ? "left"   :
    !xaxis && posY.value > 0 ? "bottom" :
    !xaxis && posY.value < 0 ? "top"    : "unknown"
  )
})
const zindex = computed(() => 3 - props.index)
const transform = computed(() => `translate(${posX.value}px, ${posY.value}px) rotate(${angle.value}deg) scale(${scale.value})`)


/* -------------------------------------------------------------------------- */
/*                                   Action                                   */
/* -------------------------------------------------------------------------- */

function reset(index: number) {
  if (index !== 0) {
    posX.value = 0
    posY.value = 0
    angle.value = 0
    flipped.value = false
  } else {
    card.value.style.transition = ".5s cubic-bezier(0.34, 1.56, 0.64, 1)"
  }

  scale.value = 1 - (0.1 * index)
}

function flip() {
  flipped.value = !flipped.value
}

function enableInteraction() {
  interact(card.value as Target).draggable({
    listeners: {
      start(event) {
        if (props.index !== 0) { return }
        event.target.style.transition = "none"
      },
      move(event) {
        if (props.index !== 0) { return }
        onSwiping(event.dx, event.dy)
      },
      end(event) {
        event.target.style.transition = "0.25s ease-in-out"
        onSwiped()
      }
    }
  })
}

function disableInteraction() {
  interact(card.value as Target).unset()
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onSwiping(dx: number, dy: number) {
  posX.value += dx
  posY.value += dy

  angle.value = 15 * (posX.value / 300);
  if (angle.value > 15) { angle.value = 15 }
  if (angle.value < -15) { angle.value = -15 }


  emit('swiping', {
    direction: direction.value,
    value: distance.value
  })
}

function onSwiped() {
  // if (Math.abs(posY.value) > 100) {
  //   posY.value *= 8
  //   disableInteraction()
  //   emit('rejected')
  //   return
  // }

  if (distance.value != 0) {
    angle.value *= 2
    if (direction.value == "left") posX.value *= 8
    if (direction.value == "right") posX.value *= 8
    if (direction.value == "top") posY.value *= 8
    if (direction.value == "bottom") posY.value *= 8

    emit('swiped', { direction: direction.value, value: distance.value })
  } else {
    posX.value = 0
    posY.value = 0
    angle.value = 0
    emit('swiping', { direction: "none", value: 0})
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */
onMounted(() => {
  watch(() => props.index, (index: number) => {
    // setTimeout(() => reset(index), 10)
    reset(index)
  }, { immediate: true })

  enableInteraction()
})

onBeforeUnmount(() => {
  disableInteraction()
})
</script>

<style scoped lang="scss">
.card {
  color: black;
  width: calc(100% - 20px);
  height: calc(100% - 20px);

  margin: 10px;

  perspective: 1800px;
  position: absolute;
  transition: .5s cubic-bezier(0.34, 1.56, 0.64, 1);
  //transform .5s cubic-bezier(0.34, 1.56, 0.64, 1);
  touch-action: none;
  user-select: none;
  z-index: v-bind(zindex);
  transform: v-bind(transform);

  will-change: transform;

  .overlay {
    padding: 20px;
    // text-align: center;
    border-radius: 8px;
    border: 1px solid #ddd;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // backface-visibility: hidden;
    overflow: hidden;
    // transition: .5s ease-in-out;
    // &--front {
    //   border-left: 10px solid #ddd;
    // }
    // &--back {
    //   transform: rotateY(0.5turn);
    //   border-right: 10px solid #ddd;
    // }
  }

  .card__face {
    outline: 1px solid transparent;
    background-color: white;
    padding: 20px;
    // text-align: center;
    border-radius: 8px;
    border: 1px solid #ddd;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: .5s ease-in-out;

    &--front {
      border-left: 10px solid #ddd;
    }

    &--back {
      transform: rotateY(0.5turn);
      border-right: 10px solid #ddd;
    }
  }
}


.open>.card__face--back {
  transform: rotateY(0turn);
}

.open>.card__face--front {
  transform: rotateY(-0.5turn);
}
</style>