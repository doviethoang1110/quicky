import firebase from 'firebase';
import config from "../config";

const firebaseConfig = {
    apiKey: config.FIREBASE_KEY,
    authDomain: config.FIREBASE_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE,
    messagingSenderId: config.FIREBASE_MESSAGE_SENDER_ID,
    appId: config.FIREBASE_ID,
    measurementId: config.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};