import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc,onSnapshot, setDoc, getDoc, addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBfC1de0MuIdW5PagHdZFhQdLiYhTu0jDI",
  authDomain: "nativetesting-72b6b.firebaseapp.com",
  projectId: "nativetesting-72b6b",
  storageBucket: "nativetesting-72b6b.appspot.com",
  messagingSenderId: "73253810375",
  appId: "1:73253810375:web:46e7afc65fb7618bf10ee2",
  measurementId: "G-MHNM02V1NZ"
});

const auth =  getAuth();
const db = getFirestore();


export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 

    db,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
}