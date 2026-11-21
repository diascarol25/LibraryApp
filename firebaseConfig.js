import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX8jh7HgAcMXlLJjaniUBkGx97gCaCojE",
  authDomain: "libraryapp-b31d6.firebaseapp.com",
  projectId: "libraryapp-b31d6",
  storageBucket: "libraryapp-b31d6.firebasestorage.app",
  messagingSenderId: "688626520776",
  appId: "1:688626520776:web:7155262fc173dc912c0bfd",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);