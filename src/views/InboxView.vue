<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            color="primary"
            @click="openModal"
          >
            {{ t('add') }}
          </ion-button>
        </ion-buttons>
        <ion-title>{{ t('inbox') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
      <FlipCard
        v-for="card, idx in cards"
        :key="card.id"
        :index="idx"
        :swipe-threshold="settings.swipeThreshold"
        :swipe-directions="swipeDirections"
        @swiped="onTopCardSwiped"
        @swiping="onTopCardSwiping"
      >
        <template #overlay>
          <InboxCardProgressOverlay :state="card.progress" />
        </template>

        <template #front>
          <div
            v-if="card.type === InboxTypeCard.text"
            class="front"
          >
            <div class="number">
              {{ card.verse.number }}
            </div>
            <VerseLines :text="card.verse.text || ''" />
          </div>

          <div
            v-if="card.type === InboxTypeCard.transaltion"
            class="front"
          >
            <div class="number">
              {{ card.verse.number }}
            </div>
            <div>{{ card.verse.translation }}</div>
          </div>
        </template>

        <template #back>
          <WordByWordTranslationSide :words="card.verse.words || []" />
        </template>
      </FlipCard>

      <!-- Inbox deck is empty -->
      <InboxEmpty
        v-if="inboxStore.isEmpty"
        @click="openModal"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle,
  IonButtons, IonButton, modalController
} from '@ionic/vue';

import InboxEmpty from '@/components/inbox/InboxEmpty.vue'
import FlipCard from '@/components/cards/FlipCard.vue'
import VerseLines from '@/components/VerseLines.vue'
import InboxAddVerseDialog from '@/components/inbox/AddVerseDialog.vue'

import { ref, computed } from 'vue'
import { settings } from '@/lib/settings'
import { useInboxStore } from '@/stores/inbox'
import { useReviewStore } from '@/stores/review'
import { InboxTypeCard } from '@/stores/inbox'
import { Verse, getVerse } from '@/lib/verses'
import { useI18n } from 'vue-i18n'
import InboxCardProgressOverlay from '@/components/inbox/cards/InboxCardProgressOverlay.vue'
import WordByWordTranslationSide from '@/components/inbox/cards/WordByWordTranslationSide.vue'

const inboxStore = useInboxStore()
const reviewStore = useReviewStore()
const { t } = useI18n()

interface RevieInboxCardViewModel {
  id: string,
  type: InboxTypeCard
  verse: Verse
  progress: string
}


const cards = ref<RevieInboxCardViewModel[]>([])
const swipeDirections = computed(() => {
  return cards.value.length > 1 ? ['top', 'bottom', 'left', 'right'] : ['top', 'bottom']
})

function updateViewModel() {
  cards.value = inboxStore.readyForReview.map(x => ({
    id: x.id,
    type: x.type,
    verse: getVerse(x.verseId),
    progress: ""
  }))
}

function onTopCardSwiping({ direction, value }) {
  const first = cards.value[0]
  first.progress =
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
}

function onTopCardSwiped({ direction }) {
  setTimeout(() => {
    const first = cards.value.shift()
    if (!first) { return }
    first.progress = ""

    if (direction == "left" || direction == "right") {
        cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      inboxStore.mark(first.id)

      const verseId = first.verse.number || ""
      const allReviewd = inboxStore.isAllReviewdByVerse(verseId)
      if (first.type == InboxTypeCard.text) {
        reviewStore.addCard(verseId, "text:number")
        reviewStore.addCard(verseId, "number:text")
      } else if (first.type == InboxTypeCard.transaltion) {
        reviewStore.addCard(verseId, "translation:number")
        reviewStore.addCard(verseId, "number:translation")
      }
      if (allReviewd) {
        reviewStore.addCard(verseId, "translation:text")
        reviewStore.addCard(verseId, "text:translation")
      }
    }

  }, 250)
}


async function openModal() {
  const modal = await modalController.create({
    component: InboxAddVerseDialog,
  });
  modal.present();
  const { data, role } = await modal.onWillDismiss();
  if (role === 'confirm') {
    inboxStore.addCard(InboxTypeCard.text, data)
    inboxStore.addCard(InboxTypeCard.transaltion, data)
    updateViewModel()
  }
}
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

.number {
  text-transform: uppercase;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
  font-size: 6vw;
}
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
add: Add
inbox: Inbox
</i18n>


<i18n locale="ru" lang="yaml">
add: Добавить
inbox: Входящие
</i18n>
