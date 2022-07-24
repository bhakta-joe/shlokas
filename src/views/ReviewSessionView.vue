<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Review</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Review</ion-title>
        </ion-toolbar>
      </ion-header>

      <VerseQAView
        :question="question"
        :frontSide="frontSide"
        :backSide="backSide"
        :showBackSide="showBackSide"
        @click="onCardClicked"
      />

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import VerseQAView from '@/components/VerseQAView.vue'
import { ref } from 'vue'
import { useReviewStore } from '@/stores/review';
import { verses } from '@/lib/verses';

const reviewStore = useReviewStore()


function nextCard () {
  const card = reviewStore.readyForReview[0]
  const tokens = card.type.split(":")
  const verse = verses.find(x => x.number === card.verseId)

  question.value = "waht is a " + tokens[1] + "?"
  frontSide.value = verse[tokens[0]]
  backSide.value = verse[tokens[1]]
}

const question = ref<string>("Question")
const frontSide = ref<string>("Answer")
const backSide = ref<string>("Answer")
const showBackSide = ref<boolean>(false)

function onCardClicked() {
  if (!showBackSide.value) {
    showBackSide.value = true
  } else {
    reviewStore.markReviewed()
    nextCard()
    showBackSide.value = false
  }
}
</script>
