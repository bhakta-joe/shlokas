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
    answerThreshold: number,
}>()

const emit = defineEmits(['reviewed', 'rating'])

const card = ref()
const isCardOpen = ref<boolean>(false)

const x = ref<number>(0)
const y = ref<number>(0)
const rotation = ref<number>(0)
const opacity = ref<number>(0)
const scale = ref<number>(.8)


function showCard() {
    opacity.value = 1
    scale.value = 1
}

function showAnswer() {
    isCardOpen.value = true
}

const transform = computed(() =>
    `translate(${x.value}px, ${y.value}px)
    rotate(${rotation.value}deg)
    scale(${scale.value})`
)


onMounted(() => {
    watch(() => props.visible, (value: boolean) => {
        if (value) { showCard() }
    }, { immediate: true })

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

                if (Math.abs(x.value) > props.answerThreshold) {
                    emit('rating', x.value > 0 ? x.value - props.answerThreshold : x.value + props.answerThreshold)
                }
            },
            end(event) {
                event.target.style.transition = ".5s ease-in-out"
                const movedLong = Math.abs(x.value) >= props.answerThreshold
                if (movedLong) {
                    opacity.value = 0
                    emit('reviewed')
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
$ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
.card {
    color: black;
    width: calc(100% - 20px);
    height: calc(100% - 20px);

    margin: 10px;

    perspective: 1800px;
    position: absolute;
    transition: .5s ease-in-out;
    // transition: 0.7s $ease-out-back;
    touch-action: none;
    user-select: none;
    z-index: v-bind("props.index");
    transform: v-bind(transform);
    opacity: v-bind(opacity);

    .card__face {
        background-color: white;
        padding: 20px;
        text-align: center;
        box-shadow: 0 5px 0px 0px #555;
        border-radius: 0.4em;
        border: 1px solid #ddd;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: .5s ease-in-out;

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