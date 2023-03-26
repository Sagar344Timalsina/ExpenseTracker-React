
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzzoeqq0NkPbFvUwdqhN-sxNurQ65XH-I",
  authDomain: "expense-tracker-1ad49.firebaseapp.com",
  databaseURL: "https://expense-tracker-1ad49-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-1ad49",
  storageBucket: "expense-tracker-1ad49.appspot.com",
  messagingSenderId: "995423478404",
  appId: "1:995423478404:web:f53404f7c7dd44e1a358d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);