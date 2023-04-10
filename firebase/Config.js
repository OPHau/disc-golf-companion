// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth, 
  getReactNativePersistence } from 'firebase/auth/react-native';

const config = require('../configuration')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const USERS_REF = "/users/"
export const db = getDatabase(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  export { auth };