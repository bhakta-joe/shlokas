<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Add new verse</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm">Confirm</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">Verse</ion-label>
            <ion-input placeholder="Verse number" v-model="text"></ion-input>
        </ion-item>

        <ion-list>
            <ion-item
                v-for="verse in filteredVerses"
                :key="verse.number"
                @click="confirm(verse.number)"
            >
                <ion-label>
                    <h2>{{ verse.number }}</h2>
                    <!-- <h3>I'm a big deal</h3> -->
                    <p>{{ verse.translation }}</p>
                </ion-label>
            </ion-item>
        </ion-list>

    </ion-content>
</template>

<script lang="ts" setup>
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    modalController,
} from '@ionic/vue';
import { ref, computed } from 'vue'
import { verses } from "@/lib/verses"
const text = ref<string>("")
const filteredVerses = computed(() => {
    return verses.filter(
        x => x.number.includes(text.value) ||
             x.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(text.value) ||
             x.translation.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(text.value)
    )
})

function cancel() {
    return modalController.dismiss(null, 'cancel');
}
function confirm(number: string) {
    return modalController.dismiss(number, 'confirm');
}

</script>