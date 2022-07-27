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
    >
      <div class="perspective">
        <VerseCard
          v-for="card, idx in cards.slice(0,2)"
          :key="card.card.id"
          :visible="card.visible"
          :index="reviewCount - idx"
          @reviewed="out"
        >
          <template v-slot:question>
            <div v-if="card.card.type === 'text:number'" class="front">
              <div>Number?</div>
              <div>{{ card.verse?.text }}</div>
            </div>
            <div v-if="card.card.type === 'translation:number'" class="front">
              <div>Number?</div>
              <div>{{ card.verse?.translation }}</div>
            </div>
            <div v-if="card.card.type === 'number:text'" class="front">
              <div>Text?</div>
              <div>{{ card.verse?.number }}</div>
            </div>
            <div v-if="card.card.type === 'number:translation'" class="front">
              <div>Translation?</div>
              <div>{{ card.verse?.number }}</div>
            </div>
            <div v-if="card.card.type === 'translation:text'" class="front">
              <div>Text?</div>
              <div>{{ card.verse?.translation }}</div>
            </div>
            <div v-if="card.card.type === 'text:translation'" class="front">
              <div>Translation?</div>
              <div>{{ card.verse?.text }}</div>
            </div>
          </template>

          <template v-slot:answer>
            <div v-if="card.card.type === 'text:number'" class="back">
              <div>{{ card.verse?.number }}</div>
            </div>
            <div v-if="card.card.type === 'translation:number'" class="back">
              <div>{{ card.verse?.number }}</div>
            </div>
            <div v-if="card.card.type === 'number:text'" class="back">
              <div>{{ card.verse?.text }}</div>
            </div>
            <div v-if="card.card.type === 'number:translation'" class="back">
              <div>{{ card.verse?.translation }}</div>
            </div>
            <div v-if="card.card.type === 'translation:text'" class="back">
              <div>{{ card.verse?.text }}</div>
            </div>
            <div v-if="card.card.type === 'text:translation'" class="back">
              <div>{{ card.verse?.translation }}</div>
            </div>
          </template>
        </VerseCard>
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBadge, IonProgressBar, IonContent } from '@ionic/vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import { ref, computed } from 'vue'
import { ReviewCard, useReviewStore } from '@/stores/review';
import { Verse, verses } from '@/lib/verses';

const reviewStore = useReviewStore()

interface ReviewCardViewModel {
  card: ReviewCard
  visible: boolean
  verse: Verse | undefined
}


const progress = computed(() => 1 - cards.value.length / reviewCount)

const cards = ref<ReviewCardViewModel[]>([])
reviewStore.readyForReview.forEach((card: ReviewCard) => {
  cards.value.push({
    card: card,
    verse: verses.find(v => v.number === card.verseId),
    visible: false
  })
})
cards.value[0].visible = true

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

.front {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: justify;
  text-justify: inter-word;
}

.back {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
}
</style>