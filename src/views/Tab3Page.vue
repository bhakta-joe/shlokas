<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>
          <ion-badge>{{ cards.length }}</ion-badge>&nbsp;
        </ion-title>
        <ion-progress-bar :value="progress"/>
      </ion-toolbar>
    </ion-header>

    <ion-content
      :scroll-events="false"
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
        <VerseCard
          v-for="card, idx in cards"
          :key="card.id"
          :visible="card.visible"
          :index="reviewCount-idx"
          @reviewed="out"
        >
          <template v-slot:question>
            QUESTION Card #{{ card.id }} {{ card.visible }}
          </template>
          <template v-slot:answer>
            ANSWER Card #{{ card.id }} {{ card.visible }}
          </template>
        </VerseCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBadge, IonProgressBar, IonContent } from '@ionic/vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import { ref, computed } from 'vue'

interface ReviewCardViewModel {
  id: string
  visible: boolean
}

const progress = computed(() => 1 - cards.value.length / reviewCount)

const cards = ref<ReviewCardViewModel[]>([
  { id: '1', visible: true },
  { id: '2', visible: false },
  { id: '3', visible: false },
])
const reviewCount = cards.value.length

function out() {
  setTimeout(() => cards.value.splice(0, 1), 500)
  if (cards.value.length > 1) {
    cards.value[1].visible = true
  }
}
</script>

<style scoped>
.perspective {
  perspective: 800px;
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
</style>