import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ||"AIzaSyAL-_Mq_-9fXa6DfzQkCLv3AAMOyasC05g",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "bbwolfbank.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "bbwolfbank",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "bbwolfbank.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "46657686596",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:46657686596:web:04f8fcfb35c2af72ba4011",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app