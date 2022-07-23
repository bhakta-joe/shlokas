<template>
  <div class="root">
    <div class="number">{{props.number}}</div>
    <div v-for="line, idx in text" :key="idx">
      {{ line }}
    </div>
    <br/>
    <ion-checkbox></ion-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { IonCheckbox } from '@ionic/vue';
const props = defineProps<{text: string, number:string}>()

const text = props.text.split("\n")
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
}
.root .number {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px black solid;
  color: white;
  background-color: darkslategray;
}
</style>
