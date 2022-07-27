<template>
    <div
        ref="card"
        class="card"
        @click="showAnswer"
    >
        <div class="card__face card__face--front">
            <slot name="question"></slot>
        </div>

        <div class="card__face card__face--back">
            <slot name="answer"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import interact from "interactjs";
import { onMounted, ref, defineProps, watch, defineEmits } from 'vue'
import { Target } from '@interactjs/types';

const props = defineProps<{
    visible: boolean,
    index: number,
}>()

const emit = defineEmits(['reviewed'])
const card = ref()



function showAnswer() {
    setTransform(0,0,.5,1)
}

function setTransform(x: number, y: number, angle: number, scale: number) {
    if (card.value) {
        card.value.style.transform = `translate(${x}px, ${y}px) rotateY(${angle}turn) scale(${scale})`
        console.log(card.value.style.transform);
    }
}
function setOpacity(x: number) {
    if (card.value) {
        card.value.style.opacity = `${x}`
        console.log(card.value.style.opacity);
    }
}


onMounted(() => {
    watch(() => props.visible, (value) => {
        console.log("!!!", value)
        if (value) {
            setOpacity(1)
            setTransform(0, 0, 0, 1)
        } else {
            setOpacity(0)
            setTransform(0, 0, 0, .8)
        }
    },{ immediate:true })

    interact(card.value as Target).draggable({
        listeners: {
            move(event) {
                var target = event.target
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                target.style.transitionDuration = "0s"
                setTransform(x, y, .5, 1)

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            },
            end(event) {
                var target = event.target
                target.style.transitionDuration = "500ms"
                // setOpacity(0)
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                setTransform(x*5, y*5, .5, 1)
                emit('reviewed')
            }
        }
    })
})
</script>

<style scoped lang="scss">
.card {
    color: black;
    width: 96%;
    height: 97%;
    padding: 5px;
    position: absolute;
    background-color: white;
    box-shadow: 0 5px 0px 0px #555;
    border-radius: 0.3em;
    border: 1px solid #ddd;
    transition: all;
    transition-duration: 500ms;

    padding: 4%;
    margin: 2%;
    touch-action: none;
    user-select: none;
    z-index: v-bind("props.index");
    transform-style: preserve-3d;

    .card__face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      text-align: center;
      padding: 10px;

      &--back {
        transform: rotateY(0.5turn);
      }
    }
}
</style>