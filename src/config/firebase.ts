// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBHEWs_bk9or9ZalVyGT3zKuQB_qABSayM",
  authDomain: "ebuddy-7bbdc.firebaseapp.com",
  projectId: "ebuddy-7bbdc",
  storageBucket: "ebuddy-7bbdc.appspot.com",
  messagingSenderId: "980349394767",
  appId: "1:980349394767:web:18ef75271295a3a024af3a",
  measurementId: "G-653ZZSB3QW",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
