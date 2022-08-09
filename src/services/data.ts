// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN7KI0s5Bw6Ashdq0-Bgqxh6NEtJXgM-M",
  authDomain: "com-akdasa-shlokas.firebaseapp.com",
  projectId: "com-akdasa-shlokas",
  storageBucket: "com-akdasa-shlokas.appspot.com",
  messagingSenderId: "879891505939",
  appId: "1:879891505939:web:4d6b7a0fb5f631a9dab0e6",
  measurementId: "G-PCELHRDFSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export let dbError = ""

enableIndexedDbPersistence(db,
  { forceOwnership: true }
)
  .catch((err) => {
    dbError = err
    console.log(err)
      // if (err.code == 'failed-precondition') {
      //     // Multiple tabs open, persistence can only be enabled
      //     // in one tab at a a time.
      //     // ...
      // } else if (err.code == 'unimplemented') {
      //     // The current browser does not support all of the
      //     // features required to enable persistence
      //     // ...
      // }
  });

