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
const emit = defineEmits(['swiped', 'swiping', 'rejected'])


/* -------------------------------------------------------------------------- */
/*                          Component internal state                          */
/* -------------------------------------------------------------------------- */

const card = ref()

const flipped = ref<boolean>(false)
const posX = ref<number>(0)
const posY = ref<number>(0)
const angle = ref<number>(0)
const scale = ref<number>(.95)

const mark = computed<number>(function () {
  if (posX.value > props.swipeThreshold) { return posX.value - props.swipeThreshold }
  if (posX.value < -props.swipeThreshold) { return posX.value + props.swipeThreshold }
  return 0;
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
        onMove(event.dx, event.dy)
      },
      end(event) {
        event.target.style.transition = "0.5s ease-in-out"
        onMoved()
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

function onMove(dx: number, dy: number) {
  posX.value += dx
  posY.value += dy

  angle.value = 15 * (posX.value / 300);
  if (angle.value > 15) { angle.value = 15 }
  if (angle.value < -15) { angle.value = -15 }

  emit('swiping', mark.value)
}

function onMoved() {
  if (Math.abs(posY.value) > 100) {
    posY.value *= 8
    disableInteraction()
    emit('rejected')
    return
  }

  if (mark.value != 0) {
    angle.value *= 2
    posX.value *= 8
    emit('swiped', mark.value)
  } else {
    posX.value = 0
    posY.value = 0
    angle.value = 0
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */
onMounted(() => {
  watch(() => props.index, (index: number) => {
    setTimeout(() => reset(index), 1)
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
  transition: .5s;
  //transform .5s cubic-bezier(0.34, 1.56, 0.64, 1);
  touch-action: none;
  user-select: none;
  z-index: v-bind(zindex);
  transform: v-bind(transform);

  will-change: transform;

  .card__face {
    outline: 1px solid transparent;
    background-color: white;
    padding: 20px;
    text-align: center;
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