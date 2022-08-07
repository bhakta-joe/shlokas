<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTimeStore } from './stores/time';
const timeStore = useTimeStore()

setInterval(() => timeStore.setNow(), 1000)
</script>