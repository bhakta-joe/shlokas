<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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
        :key="card.card.id"
        :index="idx"
        :swipe-threshold="settings.swipeThreshold"
        :swipe-directions="swipeDirections"
        @swiped="onTopCardSwiped"
        @swiping="onTopCardSwiping"
      >
        <template #overlay>
          <CardProgressOverlay :grade="card.grade" />
        </template>

        <template #front>
          <div
            v-if="card.card.type === 'text:number'"
            class="front"
          >
            <div class="q">
              Number
            </div>
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div
            v-if="card.card.type === 'translation:number'"
            class="front"
          >
            <div class="q">
              Number
            </div>
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div
            v-if="card.card.type === 'number:text'"
            class="front"
          >
            <div class="number">
              {{ card.verse?.number }}
            </div>
          </div>
          <div
            v-if="card.card.type === 'number:translation'"
            class="front"
          >
            <div class="q">
              Translation
            </div>
            <div class="number">
              {{ card.verse?.number }}
            </div>
          </div>
          <div
            v-if="card.card.type === 'translation:text'"
            class="front"
          >
            <div class="q">
              Text
            </div>
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div
            v-if="card.card.type === 'text:translation'"
            class="front"
          >
            <div class="q">
              Translation
            </div>
            <verse-lines :text="card.verse?.text || ''" />
          </div>
        </template>

        <template #back>
          <div
            v-if="card.card.type === 'text:number'"
            class="back"
          >
            <div class="a number">
              {{ card.verse?.number }}
            </div>
          </div>
          <div
            v-if="card.card.type === 'translation:number'"
            class="back"
          >
            <div class="a number">
              {{ card.verse?.number }}
            </div>
          </div>
          <div
            v-if="card.card.type === 'number:text'"
            class="back"
          >
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div
            v-if="card.card.type === 'number:translation'"
            class="back"
          >
            <div>{{ card.verse?.translation }}</div>
          </div>
          <div
            v-if="card.card.type === 'translation:text'"
            class="back"
          >
            <verse-lines :text="card.verse?.text || ''" />
          </div>
          <div
            v-if="card.card.type === 'text:translation'"
            class="back"
          >
            <div>{{ card.verse?.translation }}</div>
          </div>
        </template>
      </FlipCard>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonProgressBar, IonContent } from '@ionic/vue';
import FlipCard from '@/components/cards/FlipCard.vue';
import CardProgressOverlay from '@/components/review/CardProgressOverlay.vue'
import VerseLines from '@/components/VerseLines.vue';
import { ref, computed, onMounted } from 'vue'
import { settings } from '@/lib/settings'
import { ReviewCard, useReviewStore } from '@/stores/review';
import { Verse, getVerse } from '@/lib/verses';

const reviewStore = useReviewStore()

interface ReviewCardViewModel {
  card: ReviewCard
  verse: Verse
  grade: number
}

const swipeDirections = ['left', 'right']
const progress = computed(() => 1 - cards.value.length / reviewCount)

const cards = ref<ReviewCardViewModel[]>([])
function updateViewModel() {
  cards.value = reviewStore.readyForReview.map(x => ({
    card: x,
    verse: getVerse(x.verseId),
    grade: 0
  }))
}

const reviewCount = cards.value.length

function onTopCardSwiped({ direction, value }) {
  setTimeout(() => cards.value.splice(0, 1), 500)
}

function onTopCardSwiping({ direction, value }) {
  const first = cards.value[0]
  if (direction === "left")  { first.grade = Math.floor(value / 40) }
  if (direction === "right") { first.grade = Math.floor(value / 25) }
  if (first.grade < -2) { first.grade = -2 }
  if (first.grade > 3)  { first.grade = 3 }

  // first.grade = value
    // (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    // (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
}

onMounted(() => updateViewModel())
</script>

<style scoped>
.front {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.back {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.q {
  text-transform: uppercase;
  font-size: 6vw;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
}

.number {
  font-size: 12vw;
}
</style>