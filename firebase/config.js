import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZA-Z7BAaRVRkDI3OLFochiR24UT6yzj0",
  authDomain: "reatc-native-project.firebaseapp.com",
  projectId: "reatc-native-project",
  storageBucket: "reatc-native-project.appspot.com",
  messagingSenderId: "84541677423",
  appId: "1:84541677423:web:7eda0a3ead17adb79a929a",
  measurementId: "G-1QD9SYQPEP",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
