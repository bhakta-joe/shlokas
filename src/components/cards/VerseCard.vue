<template>
    <div
        ref="card"
        :class="classes"
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
const classes = ref({
    card: true,
    invisible: true,
    in: false, out: false, open: false
})
const card = ref()

watch(() => props.visible, (value) => {
    if (value) { classes.value.in = true }
    classes.value.invisible = !value
},{ immediate:true })

function showAnswer() {
    classes.value.open = true // !classes.value.open
    classes.value.in = false // !classes.value.open
}

onMounted(() => {
    interact(card.value as Target).draggable({
        listeners: {
            move(event) {
                var target = event.target
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                // translate the element
                // target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
                target.style.left = x + 'px'
                target.style.top = y + 'px'

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            },
            end() {
                // var target = event.target
                // target.style.opacity = 0
                // classes.value.in = false
                classes.value.open = false
                classes.value.out = true
                emit('reviewed')
            }
        }
    })
})
</script>

<style scoped lang="scss">
.invisible {
    opacity: 0;
}

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
    z-index: v-bind("props.index");
    transform-style: preserve-3d;

    &.open {
        animation-duration: 0.5s;
        animation-name: animate-open;
        animation-fill-mode: forwards;
    }

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

.in {
    animation-duration: 0.5s;
    animation-name: animate-in;
    animation-fill-mode: forwards;
}


@keyframes animate-in {
    0% {
        opacity: 0;
        transform: translate(0px, 0px) scale(.8);
    }

    100% {
        opacity: 1;
        transform: translate(0px, 0px) scale(1);
    }
}

@keyframes animate-open {
    0% { transform: rotateY(0turn); }
    100% { transform: rotateY(0.5turn); }
}

.out {
    animation-duration: 0.5s;
    animation-name: animate-out;
    animation-fill-mode: forwards;
    transform: rotateY(0.5turn);
}

@keyframes animate-out {
    // 0% { opacity: 1; background: red }
    100% { opacity: 0; }
}
</style>