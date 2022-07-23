<template>
  <div id="container">
    <div>{{props.number}}</div>
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
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  font-size: 6vw;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
