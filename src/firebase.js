import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";

const {REACT_APP_FIREBASE_VAPID_KEY} = process.env;

const firebaseConf = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const firebaseApp = initializeApp(firebaseConf);
export const messaging = getMessaging();


export const getTokenMessaging = () =>
    new Promise((resolve, reject) => {
        getToken(messaging, {vapidKey: REACT_APP_FIREBASE_VAPID_KEY})
            .then((currentToken) => {
                resolve(currentToken);
            })
            .catch((error) => {
                reject(error);
            });
    });
