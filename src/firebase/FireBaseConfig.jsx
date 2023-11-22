// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJO7zWeHBZDG9NkQMHR4oh3X1f2ryXpCU",
  authDomain: "myfirstapp-f7d5b.firebaseapp.com",
  projectId: "myfirstapp-f7d5b",
  storageBucket: "myfirstapp-f7d5b.appspot.com",
  messagingSenderId: "1007040089280",
  appId: "1:1007040089280:web:2bed64984cfc6285e8b125"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB , auth}  