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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { useTimeStore } from '@/stores/time'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

const auth = getAuth();
async function register() {
  createUserWithEmailAndPassword(auth, "a@a.com", "pwd123")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error)
    });
}

function logIn() {
  signInWithEmailAndPassword(auth, "a@a.com", "pwd123")
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.log(error)
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
    // ...
  } else {
    // User is signed out
    // ...
  }
});
</script>
