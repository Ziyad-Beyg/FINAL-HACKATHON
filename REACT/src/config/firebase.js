import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  sendEmailVerification,
  updatePassword,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteField,
  increment,
} from 'firebase/firestore';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBfC1de0MuIdW5PagHdZFhQdLiYhTu0jDI",
  authDomain: "nativetesting-72b6b.firebaseapp.com",
  projectId: "nativetesting-72b6b",
  storageBucket: "nativetesting-72b6b.appspot.com",
  messagingSenderId: "73253810375",
  appId: "1:73253810375:web:46e7afc65fb7618bf10ee2",
  measurementId: "G-MHNM02V1NZ"
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  sendEmailVerification,
  updatePassword,
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
  orderBy,
  updateDoc,
  deleteField,
  increment,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
};
