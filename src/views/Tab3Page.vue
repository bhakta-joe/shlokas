<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>
          Settings
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button
        @click="nextDay"
      >
        Next Day
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { useTimeStore } from '@/stores/time'

const timeStore = useTimeStore()

function nextDay() {
  timeStore.shiftDays += 1
}
</script>
