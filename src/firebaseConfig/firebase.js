
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD5DKhn7QlbncBTxMbefoay3P2IT2zrDRc",
  authDomain: "bookstore-2209g2.firebaseapp.com",
  projectId: "bookstore-2209g2",
  storageBucket: "bookstore-2209g2.appspot.com", 
  messagingSenderId: "387319387969",
  appId: "1:387319387969:web:aef19f57ad3353e05973c0",
};


export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const storage = getStorage(app);
