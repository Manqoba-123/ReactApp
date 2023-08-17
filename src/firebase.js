// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOfgDr1AV7Su1CUvom2O-Zy60d2JXBX-8",
  authDomain: "realtor-clone-react-8ad8d.firebaseapp.com",
  projectId: "realtor-clone-react-8ad8d",
  storageBucket: "realtor-clone-react-8ad8d.appspot.com",
  messagingSenderId: "1043795809190",
  appId: "1:1043795809190:web:aea6c7307ad43cb63ab567"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();