<template>
  <div class="root">
    <div v-if="showBackSide">
      {{props.backSide}}
    </div>
    <div v-else>
      <div class="question">{{props.question}}</div>
      {{props.frontSide}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps<{
  question: string,
  frontSide: string,
  backSide: string,
  showBackSide: boolean
}>()
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

.question {
  color: gray;
  text-align: center;
  text-decoration: underline;
}

/* .root div {
  width: 100px;
  height: 100px;
} */
</style>
