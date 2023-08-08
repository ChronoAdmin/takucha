import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

let storage;
let auth;
let functions;
let db;

const firebaseConfig = {
    apiKey: "AIzaSyANqs6LSkRvO0PD2PzvygXD9Sq4XVE7Dv4",
    authDomain: "takucha-f7389.firebaseapp.com",
    projectId: "takucha-f7389",
    storageBucket: "takucha-f7389.appspot.com",
    messagingSenderId: "542574714157",
    appId: "1:542574714157:web:21e21abaacc1f67b9dc7a4",
    measurementId: "G-KNCJ9L1D24"
};

if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(firebaseConfig);
  storage = getStorage();
  auth = getAuth();
  functions = getFunctions();
  db = getFirestore();
}

export { storage, auth, functions, db };
