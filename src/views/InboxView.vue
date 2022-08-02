<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
            <ion-button color="primary" @click="openModal">Add</ion-button>
        </ion-buttons>
        <ion-title>Inbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :scroll-events="false" :scroll-y="false" :scroll-x="false" color="light">
      <div v-if="!inboxStore.isEmpty">
        <VerseCard
          v-for="card, idx in cards.slice(0,1)"
          :key="card.id"
          :visible="true"
          :index="100-idx"
          :mark-threshold="settings.minSlideToMarkCard"
          @marked="marked"
          @rejected="rejected"
        >
          <template v-slot:question>
            <div v-if="card.type === InboxTypeCard.text" class="front">
              <div class="q">{{ card.verse?.number }}</div>
              <verse-lines :text="card.verse?.text || ''" />
            </div>
            <div v-if="card.type === InboxTypeCard.transaltion" class="front">
              <div class="q">{{ card.verse?.number }}</div>
              <div>{{ card.verse?.translation }}</div>
            </div>
          </template>

          <template v-slot:answer>
            <div class="back">
            <div
              v-for="word in card.verse?.words"
              :key="word.word"
            >
              <div class="word">{{ word.word }}</div>
              <div>{{ word.translation }}</div>
            </div>
            </div>
          </template>
        </VerseCard>
      </div>

      <InboxEmpty v-if="inboxStore.isEmpty" @click="openModal" />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton, modalController } from '@ionic/vue';

import InboxEmpty from '@/components/InboxEmpty.vue';
import VerseCard from '@/components/cards/VerseCard.vue';
import VerseLines from '@/components/VerseLines.vue';
import InboxAddVerseDialog from '@/components/InboxAddVerseDialog.vue';

import { ref, computed } from 'vue'
import { settings } from '@/lib/settings'
import { InboxCard, useInboxStore } from '@/stores/inbox';
import { useReviewStore } from '@/stores/review';
import { InboxTypeCard } from '@/stores/inbox'
import { Verse, verses } from '@/lib/verses';

const inboxStore = useInboxStore()
const reviewStore = useReviewStore()

interface RevieInboxCardViewModel {
  id: string,
  type: InboxTypeCard
  visible: boolean
  verse: Verse | undefined
}


const cards = ref<RevieInboxCardViewModel[]>([])
function updateViewModel() {
  cards.value = inboxStore.readyForReview.map(x => ({
    id: x.id,
    type: x.type,
    visible: false,
    verse: verses.find(v => v.number === x.verseId)
  }))
  cards.value[0].visible = true
}

// const reviewCount = cards.value.length

function marked(value: number) {
  setTimeout(() => {
    // cards.value.splice(0, 1)
    // cards.value[0].visible = false
    const first = cards.value.shift()
    if (first) {
      cards.value.push(first)
    }
  }, 500)
  // if (cards.value.length > 1) {
  //   cards.value[1].visible = true
  // }
}

function rejected() {
   setTimeout(() => {
    const first = cards.value.shift()
    if (first) {
      inboxStore.mark(first?.id)

      const verseId = first.verse?.number || ""
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

  }, 500)
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

.word {
  font-weight: bold;
}
</style>