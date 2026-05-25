import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5J9cg_g5Ehieb4OPOmc-ZZn_5Jpk86WA",
  authDomain: "test-3-f75c3.firebaseapp.com",
  projectId: "test-3-f75c3",
  storageBucket: "test-3-f75c3.firebasestorage.app",
  messagingSenderId: "786580379959",
  appId: "1:786580379959:web:6ab05df315f1c0dc24e2b2",
  measurementId: "G-VTFB9ZSRSV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth (VERY IMPORTANT)
export const auth = getAuth(app);

// Analytics (optional)
export const analytics = getAnalytics(app);