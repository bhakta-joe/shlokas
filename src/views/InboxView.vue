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
          <InboxEmpty v-if="noCardsToReview" @click="openModal" />
          <InboxReady v-else @click="openModal" />
        </swiper-slide>

        <swiper-slide v-for="slide, idx in slides" :key="idx">
          <VerseView :text="slide.text" :number="slide.number" />
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, modalController } from '@ionic/vue';
import { ref, computed, Ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import InboxAddVerseDialog from '@/components/InboxAddVerseDialog.vue'
import { verses } from '@/lib/verses'
import VerseView from '@/components/VerseView.vue';
import InboxEmpty from '@/components/InboxEmpty.vue';
import InboxReady from '@/components/InboxReady.vue';

import 'swiper/css';
import "swiper/css/effect-cards";
import '@ionic/vue/css/ionic-swiper.css';

interface t {
  text: string
  number: string
}

const slides: Ref<t[]> = ref([])

async function openModal() {
  const modal = await modalController.create({
    component: InboxAddVerseDialog,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    const verse = verses.find(x => x.number == data)
    if (verse) {
      slides.value.push({ text: verse.text, number: verse.number })
      slides.value.push({ text: verse.translation, number: verse.number })
    }
  }
}

const noCardsToReview = computed(() => slides.value.length === 0)
</script>

<style>
.swiper {
  height: 100%;
}
</style>