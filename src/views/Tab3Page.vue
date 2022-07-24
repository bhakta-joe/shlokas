<template>
  <ion-page>
      <GameCardsStack
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
      />
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import GameCardsStack from '@/components/deck/GameCardsStack.vue'
import { ref } from 'vue'

const visibleCards = ref(["Test", "Vue.js", "Webpack"])

function handleCardAccepted() {
  console.log("handleCardAccepted");
}
function handleCardRejected() {
  console.log("handleCardRejected");
}
function handleCardSkipped() {
  console.log("handleCardSkipped");
}
function removeCardFromDeck() {
  visibleCards.value.shift();
}
</script>
