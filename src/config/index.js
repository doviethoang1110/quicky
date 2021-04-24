import development from './development.config';
import production from './production.config';

let config = {
    FIREBASE_KEY: "AIzaSyBameRqFrRvyKrqcQyAjViEJNyE5f5Q9_4",
    FIREBASE_DOMAIN: "messenger-94814.firebaseapp.com",
    FIREBASE_PROJECT_ID: "messenger-94814",
    FIREBASE_STORAGE: "messenger-94814.appspot.com",
    FIREBASE_MESSAGE_SENDER_ID: "854007587607",
    FIREBASE_ID: "1:854007587607:web:7f059c12abb1d2b3e78d52",
    FIREBASE_MEASUREMENT_ID: "G-T2LW5JPE7G",
    FIREBASE_TOP_LINK: "https://firebasestorage.googleapis.com/v0/b/messenger-94814.appspot.com/o/images%2Fmedia%2F",
    FIREBASE_BOTTOM_LINK: "?alt=media&token=7396517c-e9e7-4919-807e-6cef74caf0ef"
};

config = {...config, ...(process.env.NODE_ENV === 'production' ? production : development)};

export default config;
