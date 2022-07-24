<template>
  <div class="root">
    <div v-if="showAnswer">{{props.answer}}</div>
    <div v-else>{{props.question}}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps<{
  question: string,
  answer: string,
  show: string
}>()
const showAnswer = computed(() => props.show === "answer")
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 6vw;
  height: 100%;
}

/* .root div {
  width: 100px;
  height: 100px;
} */
</style>
