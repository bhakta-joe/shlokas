<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Review</ion-title>
        <ion-buttons slot="start">
                <ion-button color="medium">
          <ion-badge color="primary">11</ion-badge>
                </ion-button>
        </ion-buttons>

        <ion-progress-bar :value=".4"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <VerseCard
      v-for="card, idx in cards"
      :key="card"
      :visible="idx === 0"
      :index="-idx"
      @out="out"
    >
      {{ card }}
    </VerseCard>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBadge, IonProgressBar } from '@ionic/vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import { ref } from 'vue'

const cards = ref([
  'card1', 'card2', 'card3'
])

function out() {
  setTimeout(() => cards.value.splice(0, 1), 500)
}
</script>
