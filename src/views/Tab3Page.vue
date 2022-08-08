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
      <ion-button @click="nextDay">
        Next Day
      </ion-button>

      <ion-button @click="addRecord">
        Add record
      </ion-button>

      <ion-button @click="getData">
        Get data
      </ion-button>

      <div
        v-for="d, idx in data"
        :key="idx"
      >
        {{ d }}
      </div>

      {{ dbError }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { useTimeStore } from '@/stores/time'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, dbError } from '@/services/data'
import { ref } from 'vue'

const timeStore = useTimeStore()
const data = ref()

function nextDay() {
  timeStore.shiftDays += 1
}

async function getData() {
  data.value = []
  const querySnapshot = await getDocs(collection(db, "cards"));
  querySnapshot.forEach((doc) => {
    data.value.push(doc.data())
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

async function addRecord() {
  try {
    const docRef = await addDoc(collection(db, "cards"), {
      type: "number:text",
      due: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
</script>
