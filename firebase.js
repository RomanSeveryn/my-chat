import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZim2M0-xrImBpPC0ijWT0IhYh5ikrY68',
  authDomain: 'my-chat-92e66.firebaseapp.com',
  projectId: 'my-chat-92e66',
  storageBucket: 'my-chat-92e66.appspot.com',
  messagingSenderId: '1016079942227',
  appId: '1:1016079942227:web:67d8cd5985543fd1c03ca6',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
