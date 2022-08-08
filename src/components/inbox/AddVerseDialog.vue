<template>
  <!-- Header -->
  <ion-header translucent>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button
          color="medium"
          @click="onCancelPressed"
        >
          {{ t('cancel') }}
        </ion-button>
      </ion-buttons>

      <ion-title>{{ t('add-verse') }}</ion-title>
    </ion-toolbar>

    <!-- Search bar-->
    <ion-toolbar>
      <ion-searchbar
        v-model="searchQuery"
        :placeholder="t('number-or-text')"
        animated
        @ion-cancel="onCancelPressed"
      />
    </ion-toolbar>
  </ion-header>

  <!-- List -->
  <ion-content class="ion-padding">
    <!-- Refresher -->
    <ion-refresher
      slot="fixed"
      @ion-refresh="onRefreshVersesRequested"
    >
      <ion-refresher-content />
    </ion-refresher>

    <!-- List -->
    <ion-list>
      <ion-item
        v-for="verse in filteredVerses"
        :key="verse.id"
        text-wrap
        @click="onConfirmPressed(verse)"
      >
        <ion-label class="ion-text-wrap">
          <h2>{{ verse.number.title }}</h2>
          <p>{{ verse.translation }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonButton, IonItem, IonLabel, IonSearchbar, IonList,
  IonRefresher, RefresherCustomEvent, IonRefresherContent,
  modalController,
} from '@ionic/vue';
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVersesStore } from '@/stores/verses'
import { Verse } from '@/domain/models/verse';

const { t } = useI18n()
const versesStore = useVersesStore()
const searchQuery = ref<string>('')

const filteredVerses = computed(() => {
  const query = normalize(searchQuery.value)
  return versesStore.all.filter(
    x => normalize(x.number.title).includes(query) ||
         normalize(x.text).includes(query) ||
         normalize(x.translation).includes(query)
  )
})


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onRefreshVersesRequested(event: RefresherCustomEvent) {
  await versesStore.load()
  event.target.complete()
}

function onCancelPressed() {
  return modalController.dismiss(null, 'cancel');
}

function onConfirmPressed(verse: Verse) {
  return modalController.dismiss(verse, 'confirm');
}


/* -------------------------------------------------------------------------- */
/*                                   Private                                  */
/* -------------------------------------------------------------------------- */

function normalize(value: string): string {
  return value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}
</script>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
add-verse: Add verse
number-or-text: Verse number or text
</i18n>

<i18n locale="ru" lang="yaml">
add-verse: Добавить новый стих
number-or-text: Номер или текст
</i18n>
