import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhtyeWm1FSks5_wPPY60AkG6UHgvAm49g",
  authDomain: "laundry-booking-754d3.firebaseapp.com",
  projectId: "laundry-booking-754d3",
  storageBucket: "laundry-booking-754d3.firebasestorage.app",
  messagingSenderId: "697310109630",
  appId: "1:697310109630:web:9c77b9214865ee0e40e3ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);