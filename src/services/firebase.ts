import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN7KI0s5Bw6Ashdq0-Bgqxh6NEtJXgM-M",
  authDomain: "com-akdasa-shlokas.firebaseapp.com",
  projectId: "com-akdasa-shlokas",
  storageBucket: "com-akdasa-shlokas.appspot.com",
  messagingSenderId: "879891505939",
  appId: "1:879891505939:web:4d6b7a0fb5f631a9dab0e6",
  measurementId: "G-PCELHRDFSD"
};

// export let app: FirebaseApp
// export let db: Firestore
// export let auth: Auth

// export function setupFirebase() {
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) //initializeFirestore(app, {})
export const auth = initializeAuth(app)

enableIndexedDbPersistence(db, { forceOwnership: true })
  .catch((err) => {
    console.log(err)
  });
// }