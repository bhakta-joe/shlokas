<template>
    <div ref="card" class="card" :class="{
        'open': isCardOpen,
        'invisible': !isVisible,
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
import { onMounted, ref, defineProps, watch, defineEmits } from 'vue'
import { Target } from '@interactjs/types';

const props = defineProps<{
    visible: boolean,
    index: number,
}>()

const emit = defineEmits(['reviewed'])

const card = ref()
const isCardOpen = ref<boolean>(false)
const isVisible = ref<boolean>(false)
const scale = ref<number>(.8)
const x = ref<number>(0)
const y = ref<number>(0)


function showCard() {
    isVisible.value = true
    scale.value = 1
}

function showAnswer() {
    isCardOpen.value = true
}

function setTransform(x: number, y: number) {
    card.value.style.transform = `translate(${x}px, ${y}px)`
}


onMounted(() => {
    watch(() => props.visible, (value: boolean) => {
        if (value) { showCard() }
    }, { immediate: true })

    interact(card.value as Target).draggable({
        listeners: {
            move(event) {
                event.target.style.transition = "none"
                x.value += event.dx
                y.value += event.dy
                setTransform(x.value, y.value)
            },
            end(event) {
                const movedLong = Math.abs(x.value) > 20 || Math.abs(x.value) > 20
                if (movedLong) {
                    event.target.style.transition = ".5s ease-in-out"
                    isVisible.value = false
                    emit('reviewed')
                } else {
                    x.value = 0
                    y.value = 0
                    setTransform(x.value, y.value)
                }
            }
        }
    })
})
</script>

<style scoped lang="scss">
.invisible {
    opacity: 0;
    transform: scale(.8);
}
.card {
    color: black;
    width: calc(100% - 20px);
    height: calc(100% - 20px);

    margin: 10px;

    perspective: 1800px;
    position: absolute;
    transition: .5s ease-in-out;
    touch-action: none;
    user-select: none;
    z-index: v-bind("props.index");
    // left: v-bind("x");
    // top: v-bind("y");

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