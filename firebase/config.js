// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAZA-Z7BAaRVRkDI3OLFochiR24UT6yzj0",
  authDomain: "reatc-native-project.firebaseapp.com",
  projectId: "reatc-native-project",
  storageBucket: "reatc-native-project.appspot.com",
  messagingSenderId: "84541677423",
  appId: "1:84541677423:web:7eda0a3ead17adb79a929a",
  measurementId: "G-1QD9SYQPEP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
