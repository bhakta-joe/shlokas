<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { IonApp, IonRouterOutlet, toastController } from '@ionic/vue';
import { balloonOutline } from 'ionicons/icons';

import { useAuthStore } from './stores/auth';
import { useTimeStore } from './stores/time';


const timeStore = useTimeStore()
const authStore = useAuthStore()

setInterval(() => timeStore.setNow(), 1000)
authStore.init()
authStore.signIn()

watch(() => authStore.authenticatedUser, async (user) => {
  const toast = await toastController.create({
    message: 'Welcome back ' + user?.name,
    duration: 1000,
    // translucent: true,
    icon: balloonOutline,
    position: 'top',
    color: 'dark'
  })
  await toast.present()
})
</script>
