<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ t('inbox') }}</ion-label>
          <ion-badge v-if="inboxStore.cards.length">
            {{ inboxStore.cards.length }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="fileTrayFullOutline" />
          <ion-label>{{ t('review') }}</ion-label>
          <ion-badge v-if="reviewStore.readyForReview.length">
            {{ reviewStore.readyForReview.length }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="cogOutline" />
          <ion-label>{{ t('settings') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
import { fileTrayFullOutline, enterOutline, cogOutline } from 'ionicons/icons';
import { useInboxStore } from '@/stores/inbox';
import { useReviewStore } from '@/stores/review';
import { useI18n } from 'vue-i18n';

const inboxStore = useInboxStore()
const reviewStore = useReviewStore()
const { t } = useI18n()
</script>


<i18n locale="en" lang="yaml">
inbox: Inbox
review: Review
settings: Settings
</i18n>

<i18n locale="ru" lang="yaml">
inbox: Входящие
review: Изучение
settings: Настройки
</i18n>
