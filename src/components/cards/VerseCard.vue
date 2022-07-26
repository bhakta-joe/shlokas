<template>
    <div ref="card" class="card" :class="classes" @click="classes.push('open')">
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

const classes = ref<string[]>([])

const card = ref()

watch(() => props.visible, (value) => {
    if (value) { classes.value = ['in'] }
},{ immediate:true })

onMounted(() => {
    interact(card.value as Target).draggable({
        listeners: {
            move(event) {
                if (classes.value.includes('out')) {
                    event.interaction.stop();
                    return;
                }

                var target = event.target
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                // translate the element
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotateY(0.5turn)'

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)

                target.style.opacity = 1
                classes.value = ['in', 'open']
            },
            end() {
                // var target = event.target
                // target.style.opacity = 0
                classes.value = ['open', 'out']
                emit('reviewed')
            }
        }
    })
})
</script>

<style scoped lang="scss">
.card {
    width: 96%;
    height: 97%;
    padding: 5px;
    position: absolute;
    background-color: rgb(113, 196, 255);
    border: 1px solid gray;
    border-radius: 0.75em;
    padding: 4%;
    margin: 2%;
    touch-action: none;
    user-select: none;
    transform: translate(0px, 0px) scale(.8);
    opacity: 0;
    z-index: v-bind("props.index");


    transition: .5s;
    transform-style: preserve-3d;

    &.open {
      transform: rotateY(0.5turn);
    }

    .card__face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: .5s;

      &--back {
        transform: rotateY(0.5turn);
      }
    }
}

.in {
    transform: scale(1);
    opacity: 1;
    // animation-duration: 0.5s;
    // animation-name: animate-in;
    // animation-fill-mode: forwards;
}


// @keyframes animate-in {
//     0% {
//         opacity: 0;
//         transform: translate(0px, 0px) scale(.8);
//     }

//     100% {
//         opacity: 1;
//         transform: translate(0px, 0px) scale(1);
//     }
// }

.out {
    opacity: 0;
    // animation-duration: 0.5s;
    // animation-name: animate-out;
    // animation-fill-mode: forwards;
}

// @keyframes animate-out {
//     0% {
//         opacity: 1;
//     }

//     100% {
//         opacity: 0;
//     }
// }



</style>