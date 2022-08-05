<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>
          <ion-badge>{{ cards.length }}</ion-badge>&nbsp;
        </ion-title>
        <ion-progress-bar :value="progress" />
      </ion-toolbar>
    </ion-header>

    <ion-content
      :scroll-events="false"
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
      <FlipCard
        v-for="card, idx in cards"
        :key="card.id"
        :visible="card.visible"
        :index="reviewCount-idx"
        :swipe-threshold="answer_threshold"
        @reviewed="out"
        @rating="rating"
      >
        <template #front>
          QUESTION Card #{{ card.id }} {{ card.visible }}
        </template>
        <template #back>
          ANSWER Card #{{ card.id }} {{ card.visible }}
        </template>
      </FlipCard>

      <div
        v-if="showMarkLabel"
        class="mark"
      >
        {{ toHumanMark(currentCardMark) }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBadge, IonProgressBar, IonContent } from '@ionic/vue';
import FlipCard from '@/components/cards/FlipCard.vue';
import { ref, computed } from 'vue'

interface ReviewCardViewModel {
  id: string
  visible: boolean
}

const answer_threshold=50
const progress = computed(() => 1 - cards.value.length / reviewCount)
const currentCardMark = ref<number>(0)
const showMarkLabel = computed(() => Math.abs(currentCardMark.value) >= 10 )
const markColor = computed(() => currentCardMark.value < 0 ? "red" : "lightgreen")

const cards = ref<ReviewCardViewModel[]>([
  { id: '1', visible: true },
  { id: '2', visible: false },
  { id: '3', visible: false },
])
const reviewCount = cards.value.length

function out() {
  setTimeout(() => cards.value.splice(0, 1), 1500)
  if (cards.value.length > 1) {
    cards.value[1].visible = true
    currentCardMark.value = 0
  }
}

function rating(value: number) {
  currentCardMark.value = value
}

function toHumanMark(value: number): string {
  if (value < -100) { return "Very bad"}
  if (value < -50) { return "Bad"}
  if (value >  100) { return "Very good"}
  if (value >  50) { return "Good"}
  return "Normal"
}
</script>

<style scoped>
.perspective {
  perspective: 800px;
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}

.mark {
    position: fixed;
    opacity: 75%;
    bottom: 0;
    background-color: v-bind("markColor");
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    /* width: 100%; */
    z-index: 99999;
}
</style>