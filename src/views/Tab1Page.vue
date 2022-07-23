<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New Verses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">New Verses</ion-title>
        </ion-toolbar>
      </ion-header>

      <swiper>
        <swiper-slide>
          <EmptyInbox @click="openModal" v-if="slides.length == 0" />
          <FullInbox @click="openModal" v-else />
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
import { ref, Ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import AddVerseDialog from '@/components/AddVerseDialog.vue'
import { verses } from '@/lib/verses'
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import VerseView from '@/components/VerseView.vue';
import EmptyInbox from '@/components/EmptyInbox.vue';
import FullInbox from '@/components/FullInbox.vue';

interface t {
  text: string
  number: string
}

const slides: Ref<t[]> = ref([])

async function openModal() {
  const modal = await modalController.create({
    component: AddVerseDialog,
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

</script>

<style>
.swiper {
  height: 100%;
}
</style>