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

      <ion-button @click="register">
        Register
      </ion-button>

      <ion-button @click="logIn">
        Log In
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, toastController } from '@ionic/vue'
import { useTimeStore } from '@/stores/time'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth, dbError } from '@/services/data'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
    await show('??? ' + docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e);
    await show('??? ' + e)
    // await show(e.toStr)
  }
}

// const auth = getAuth();
async function register() {
  createUserWithEmailAndPassword(auth, "a@a.com", "pwd123")
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)
      // await show(user)
    })
    .catch(async (error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error)
      await show(error)
    });
}


function logIn() {
  console.log("------")
    console.log("123")
    signInWithEmailAndPassword(auth, "a@a.com", "pwd123").then((uc) => {
      console.log("aaa")
      const user = uc.user;
      console.log(user)
      // show('log in' + user)
    }).catch((error) => {
      console.log(error)
      // show("??" + error)
    })
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await show('Authenticated')
  } else {
    await show('Not authenticated')
  }
});

async function show(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 2000
  })
  await toast.present()
}
</script>
