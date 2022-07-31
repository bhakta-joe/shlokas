<template>
    <ion-header translucent>
        <ion-toolbar>
            <ion-buttons slot="primary">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>

            <ion-title>Add new verse</ion-title>
        </ion-toolbar>

        <ion-toolbar>
            <ion-searchbar
                v-model="searchQuery"
                placeholder="Verse number or text"
                animated
                @ion-cancel="cancel"
            />
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-list>
            <ion-item
                v-for="verse in filteredVerses"
                @click="confirm(verse.number)"
                :key="verse.number"
                text-wrap
            >
                <ion-label class="ion-text-wrap">
                    <h2>{{ verse.number }}</h2>
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
    modalController,
} from '@ionic/vue';
import { ref, computed } from 'vue'
import { verses } from "@/lib/verses"

const searchQuery = ref<string>("")

const filteredVerses = computed(() => {
    const query = normalize(searchQuery.value)
    return verses.filter(
        x => normalize(x.number).includes(query) ||
             normalize(x.text).includes(query) ||
             normalize(x.translation).includes(query)
    )
})

function cancel() {
    return modalController.dismiss(null, 'cancel');
}

function confirm(number: string) {
    return modalController.dismiss(number, 'confirm');
}

function normalize(value: string): string {
    return value.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
}
</script>