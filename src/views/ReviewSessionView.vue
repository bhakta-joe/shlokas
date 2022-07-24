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
        :answer="answer"
        :show="show"
        @click="onCardClicked"
      />

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import VerseQAView from '@/components/VerseQAView.vue'
import { ref } from 'vue'

const question = ref<string>("Question")
const answer = ref<string>("Answer")
const show = ref<string>("question")

function onCardClicked() {
  show.value = "answer"
}
</script>
