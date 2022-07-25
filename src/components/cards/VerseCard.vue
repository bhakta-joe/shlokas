<template>
    <div ref="card" id="card" :class="classes">
        <slot></slot>
        {{ props.visible }} {{ classes }} {{ props.index }}
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, defineProps, watchEffect, watch, defineEmits } from 'vue'
import interact from "interactjs";
import { Target } from '@interactjs/types';

const props = defineProps<{
    visible: boolean,
    index: number,
}>()
const emit = defineEmits(['out'])

const card = ref()
const classes = ref([
    props.visible ? 'in' : ''
])


watch(() => props.visible, (_, value) => {
    console.log('her')
    classes.value = ['in']
    // }
})

onMounted(() => {
    interact(card.value as Target).draggable({
        listeners: {
            move(event) {
                var target = event.target
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                // translate the element
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)

                target.style.opacity = 1
                classes.value = []

                // console.log(event)
                // x.value += event.delta.x
                // y.value += event.delta.y
                // const sliderWidth = interact.getElementRect(event.target).width
                // const value = event.pageX / sliderWidth

                // event.target.style.paddingLeft = (value * 100) + '%'
                // event.target.setAttribute('data-value', value.toFixed(2))
            },
            end(event) {
                var target = event.target
                console.log(target.getAttribute('data-x'))
                classes.value = ['out']
                emit('out')
            }
        }
    })
})
</script>

<style scoped>
#card {
    width: 96%;
    height: 97%;
    padding: 5px;
    position: absolute;
    background-color: rgb(113, 196, 255);
    /* color: white; */
    border: 1px solid gray;
    border-radius: 0.75em;
    padding: 4%;
    margin: 2%;
    touch-action: none;
    user-select: none;
    transform: translate(0px, 0px) scale(.5);
    opacity: 0;
    z-index: v-bind("props.index");
}

.in {
    animation-duration: 0.5s;
    animation-name: animate-fade;
    animation-fill-mode: forwards;
}


@keyframes animate-fade {
    0% {
        opacity: 0;
        transform: translate(0px, 0px) scale(.8);
    }

    100% {
        opacity: 1;
        transform: translate(0px, 0px) scale(1);
    }
}

.out {
    animation-duration: 0.5s;
    animation-name: animate-fade-out;
    animation-fill-mode: forwards;
    /* transform-origin: center left; */
}

@keyframes animate-fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        /* transform: scale(.8); */
    }
}
</style>