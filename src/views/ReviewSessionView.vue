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

    <ion-content :scroll-events="false" :scroll-y="false" :scroll-x="false" color="light">
      <VerseCard v-for="card, idx in cards.slice(0, 2)" :key="card.card.id" :visible="card.visible"
        :index="reviewCount - idx" :answer-threshold="50" @reviewed="out" @rating="rating">
        <template v-slot:question>
          <div v-if="card.card.type === 'text:number'" class="front">
            <div class="q">Number</div>
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div v-if="card.card.type === 'translation:number'" class="front">
            <div class="q">Number</div>
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div v-if="card.card.type === 'number:text'" class="front">
            <div class="number">{{ card.verse?.number }}</div>
          </div>
          <div v-if="card.card.type === 'number:translation'" class="front">
            <div class="q">Translation</div>
            <div class="number">{{ card.verse?.number }}</div>
          </div>
          <div v-if="card.card.type === 'translation:text'" class="front">
            <div class="q">Text</div>
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div v-if="card.card.type === 'text:translation'" class="front">
            <div class="q">Translation</div>
            <verse-lines :text="card.verse?.text || ''" />
          </div>
        </template>

        <template v-slot:answer>
          <div v-if="card.card.type === 'text:number'" class="back">
            <div class="a number">{{ card.verse?.number }}</div>
          </div>
          <div v-if="card.card.type === 'translation:number'" class="back">
            <div class="a number">{{ card.verse?.number }}</div>
          </div>
          <div v-if="card.card.type === 'number:text'" class="back">
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div v-if="card.card.type === 'number:translation'" class="back">
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div v-if="card.card.type === 'translation:text'" class="back">
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div v-if="card.card.type === 'text:translation'" class="back">
            <div>{{ card.verse?.translation }}</div>
          </div>
        </template>
      </VerseCard>

      <div class="mark">
        {{ toHumanMark(currentCardMark) }}
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBadge, IonProgressBar, IonContent } from '@ionic/vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import VerseLines from '@/components/VerseLines.vue';
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
const currentCardMark = ref<number>(0)
const markColor = computed(() => currentCardMark.value < 0 ? "red" : "lightgreen")
const showMarkLabel = computed(() => Math.abs(currentCardMark.value) >= 10 ? .7 : 0)

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
    currentCardMark.value = 0
  }
}

function rating(value: number) {
  currentCardMark.value = value
}

function toHumanMark(value: number): string {
  if (value < -100) { return "👎 👎" }
  if (value < -50) { return "👎" }
  if (value > 100) { return "👍 👍" }
  if (value > 50) { return "👍" }
  return "👌"
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
  /* text-align: justify; */
  /* text-justify: inter-word; */
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

.mark {
  position: absolute;
  /* opacity: 75%; */
  bottom: 0%;
  left: 50%;
  background-color: lightblue;
  /* v-bind("markColor"); */
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  z-index: 99999;
  transform: translate(-50%, -50%);
  font-size: 16vw;
  opacity: v-bind(showMarkLabel);
  transition: 1s ease;
}

.q {
  text-transform: uppercase;
  font-size: 6vw;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
}

.a {
  /* wew */
}

.number {
  font-size: 12vw;
}
</style>