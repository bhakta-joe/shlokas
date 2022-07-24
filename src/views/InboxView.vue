<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New Verses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <swiper effect="cards">
        <swiper-slide>
          <InboxEmpty v-if="inboxStore.isEmpty" @click="openModal" />
          <InboxReady v-else @click="openModal" />
        </swiper-slide>

        <swiper-slide
          v-for="card in inboxStore.readyForReview"
          :key="card.id"
        >
          <VerseView
            :number="card.title"
            :text="card.content"
            @marked="onCardMarked(card.id, card.title)"
          />
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, modalController } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import InboxAddVerseDialog from '@/components/InboxAddVerseDialog.vue'
import { verses } from '@/lib/verses'
import VerseView from '@/components/VerseView.vue';
import InboxEmpty from '@/components/InboxEmpty.vue';
import InboxReady from '@/components/InboxReady.vue';
import { useInboxStore } from '@/stores/inbox'
import { useReviewStore } from '@/stores/review'

import 'swiper/css';
import "swiper/css/effect-cards";
import '@ionic/vue/css/ionic-swiper.css';

const inboxStore = useInboxStore()
const reviewStore = useReviewStore()

function onCardMarked(cardId: string, verse: string) {
  inboxStore.mark(cardId)
  const isLastOne = inboxStore.isAllReviewdByVerse(verse)
  if (isLastOne) {
    reviewStore.addCard(verse, "text:number")
    reviewStore.addCard(verse, "translation:number")
    reviewStore.addCard(verse, "number:text")
    reviewStore.addCard(verse, "number:translation")
    reviewStore.addCard(verse, "translation:text")
    reviewStore.addCard(verse, "text:translation")
  }
}

async function openModal() {
  const modal = await modalController.create({
    component: InboxAddVerseDialog,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    const verse = verses.find(x => x.number == data)
    if (verse) {
      inboxStore.addCard(verse.number, verse.text)
      inboxStore.addCard(verse.number, verse.translation)
    }
  }
}
</script>

<style>
.swiper {
  height: 100%;
}
</style>