import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMK_rK5GczSdgMhXeI_o3J2pSKufGFL24",
  authDomain: "recipe-finder-8ec09.firebaseapp.com",
  projectId: "recipe-finder-8ec09",
  storageBucket: "recipe-finder-8ec09.firebasestorage.app",
  messagingSenderId: "132114009016",
  appId: "1:132114009016:web:6ba43141697e37f396dd4d",
  measurementId: "G-5D1C6Q91P1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;