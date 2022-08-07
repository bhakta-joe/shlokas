<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-progress-bar
          v-if="!empty"
          :value="progress"
        />
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
        ref="topCard"
        :key="card.card.id"
        :index="idx"
        :swipe-threshold="settings.swipeThreshold"
        :swipe-directions="swipeDirections"
        @swiped="onTopCardSwiped"
        @swiping="onTopCardSwiping"
      >
        <template #overlay>
          <CardProgressOverlay
            :grade="card.grade"
            :next-review-in-days="card.nextReviewInDays"
          />
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

      <!-- Inbox deck is empty -->
      <ReviewEmpty v-if="empty" />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonProgressBar, IonContent, onIonViewDidEnter } from '@ionic/vue';
import ReviewEmpty from '@/components/review/ReviewEmpty.vue'
import FlipCard from '@/components/cards/FlipCard.vue';
import CardProgressOverlay from '@/components/review/CardProgressOverlay.vue'
import VerseLines from '@/components/VerseLines.vue';
import { ref, computed } from 'vue'
import { settings } from '@/lib/settings'
import { ReviewCard, useReviewStore } from '@/stores/review';
import { Verse, getVerse } from '@/lib/verses';
import { useTimeStore } from '@/stores/time';

const reviewStore = useReviewStore()
const timeStore = useTimeStore()

interface ReviewCardViewModel {
  card: ReviewCard
  verse: Verse
  grade: number
  nextReviewInDays: number
}

const swipeDirections = ['left', 'right']
const progress = computed(() => 1 - cards.value.length / reviewCount.value)
const empty = computed(() => cards.value.length === 0)

const topCard = ref([])
const cards = ref<ReviewCardViewModel[]>([])
function updateViewModel() {
  cards.value = reviewStore.readyForReview.map(x => ({
    card: x,
    verse: getVerse(x.verseId),
    grade: 0,
    nextReviewInDays: 0
  }))
  reviewCount.value = cards.value.length
}

const reviewCount = ref(0)

function onTopCardSwiped({ direction, value }) {
  setTimeout(() => {
    const first = cards.value.shift()
    if (!first) { return }

    if (first.grade < 0) {
      cards.value.push(first)
      if (cards.value.length === 1) {
        (topCard.value[0] as typeof FlipCard).reset()
      }
    } else {
      first.card.reviewDate.setDate(timeStore.date.getDate() + first.grade)
    }

    first.grade = 0

  }, 500)
}

function onTopCardSwiping({ direction, value }) {
  const first = cards.value[0]
  if (direction === "left")  { first.grade = Math.floor(value / 40) }
  if (direction === "right") { first.grade = Math.floor(value / 25) }
  if (first.grade < -2) { first.grade = -2 }
  if (first.grade > 3)  { first.grade = 3 }

  if (first.grade > 0) {
    first.nextReviewInDays = first.grade
  } else {
    first.nextReviewInDays = 0
  }
}

onIonViewDidEnter(() => {
  updateViewModel()
})
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