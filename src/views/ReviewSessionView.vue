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
        v-for="card, idx in cards.slice(0, 1)"
        :key="card.card.id"
        :visible="card.visible"
        :index="reviewCount - idx"
        :swipe-threshold="settings.minSlideToMarkCard"
        @marked="marked"
        @marking="marking"
      >
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

      <div class="mark">
        {{ toHumanMark(currentCardMark) }}
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonProgressBar, IonContent } from '@ionic/vue';

import FlipCard from '@/components/cards/FlipCard.vue';
import VerseLines from '@/components/VerseLines.vue';

import { ref, computed } from 'vue'
import { settings } from '@/lib/settings'
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
const markColor = computed(() => currentCardMark.value < 0 ? "#ffe2e2" : "#e2ffe9")
const showMarkLabel = ref<number>(0)

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

function marked(value: number) {
  setTimeout(() => cards.value.splice(0, 1), 500)
  if (cards.value.length > 1) {
    cards.value[1].visible = true
    showMarkLabel.value=0
  }
}

function marking(value: number) {
  currentCardMark.value = value
  if (Math.abs(value) > 0) {
    showMarkLabel.value = .8
  } else {
    showMarkLabel.value = 0
  }
}

function toHumanMark(value: number): string {
  if (value < -50) { return "🤯" }
  if (value < 0) { return "👎" }
  if (value > 100) { return "🧠 💪" }
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
  bottom: 75%;
  left: 50%;
  background-color: v-bind(markColor);
  padding: 10px 25px 10px 25px;
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