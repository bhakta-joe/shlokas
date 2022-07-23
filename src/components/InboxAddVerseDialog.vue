<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Add new verse</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">Search</ion-label>
            <ion-input placeholder="Verse number or text" v-model="searchQuery"></ion-input>
        </ion-item>

        <ion-list>
            <ion-item
                v-for="verse in filteredVerses"
                :key="verse.number"
                @click="confirm(verse.number)"
                text-wrap
                class="item-text-wrap"
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
    IonButton, IonItem, IonLabel, IonInput, IonList, modalController,
} from '@ionic/vue';
import { ref, computed } from 'vue'
import { verses } from "@/lib/verses"

const searchQuery = ref<string>("")

const filteredVerses = computed(() => {
    return verses.filter(
        x => normalize(x.number).includes(searchQuery.value) ||
             normalize(x.text).includes(searchQuery.value) ||
             normalize(x.translation).includes(searchQuery.value)
    )
})

function cancel() {
    return modalController.dismiss(null, 'cancel');
}

function confirm(number: string) {
    return modalController.dismiss(number, 'confirm');
}

function normalize(value: string): string {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
</script>