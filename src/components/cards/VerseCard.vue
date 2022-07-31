<template>
    <div ref="card" class="card" :class="{
        'open': isCardOpen,
    }" @click="showAnswer">
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
import { onMounted, ref, defineProps, watch, defineEmits, computed, onBeforeUnmount } from 'vue'
import { Target } from '@interactjs/types';

const props = defineProps<{
    visible: boolean,
    index: number,
    markThreshold: number,
}>()

const emit = defineEmits(['marked', 'marking'])

const card = ref()
const isCardOpen = ref<boolean>(false)

const x = ref<number>(0)
const y = ref<number>(0)
const rotation = ref<number>(0)
const opacity = ref<number>(0)
const scale = ref<number>(.8)
const mark = computed<number>(function() {
    if (x.value >  props.markThreshold) { return x.value - props.markThreshold }
    if (x.value < -props.markThreshold) { return x.value + props.markThreshold }
    return 0;
})


function showCard() {
    opacity.value = 1
    scale.value = 1
}

function showAnswer() {
    isCardOpen.value = true
}

const transform = computed(() => `translate(${x.value}px, ${y.value}px) rotate(${rotation.value}deg) scale(${scale.value})`
)

onMounted(() => {

    watch(() => props.visible, (value: boolean) => {
        // console.log(value)
        if (value) {
            // console.log("!!!", card.value.style.transform)
            // card.value.style.transform = 'translate(0px, 0px) rotate(0deg) scale(.8)'
            // console.log("!!!", card.value.style.transform)
            // showCard()
            setTimeout(() => showCard(), 10)
        }
    }, {immediate:true})

    interact(card.value as Target).draggable({
        listeners: {
            start(event) {
                event.target.style.transition = "none"
            },
            move(event) {
                x.value += event.dx
                y.value += event.dy
                rotation.value = 15 * (x.value / 200);
                if (rotation.value >  15) { rotation.value =  15 }
                if (rotation.value < -15) { rotation.value = -15 }

                emit('marking', mark.value)
            },
            end(event) {
                event.target.style.transition = "0.5s ease-in-out"
                if (mark.value != 0) {
                    opacity.value = 0
                    emit('marking', mark.value)
                } else {
                    x.value = 0
                    y.value = 0
                    rotation.value = 0
                }
            }
        }
    })
})

onBeforeUnmount(() => {
    interact(card.value as Target).unset()
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
    transition: .5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
    touch-action: none;
    user-select: none;
    z-index: v-bind("props.index");
    transform: v-bind(transform);
    opacity: v-bind(opacity);

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
            border-bottom: 10px solid #ddd;
        }

        &--back {
            transform: rotateY(0.5turn);
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