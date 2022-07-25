<template>
  <ion-page>
      <VerseCard
        v-for="card, idx in cards"
        :key="card"
        :visible="idx===0"
        :index="-idx"
        @out="out"
      >
        {{ card }}
      </VerseCard>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage } from '@ionic/vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import { ref } from 'vue'

const cards = ref([
  'card1', 'card2', 'card3'
])

function out() {
  setTimeout(() => cards.value.splice(0, 1), 500)
}
</script>
