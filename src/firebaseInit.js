import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const { REACT_APP_FIREBASE_VAPID_KEY } = process.env;

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

getToken(messaging, { vapidKey: REACT_APP_FIREBASE_VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log(currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log("No registration token available. Request permission to generate one.");
    // ...
  }
}).catch((err) => {
  console.log("An error occurred while retrieving token. ", err);
  // ...
});


export const getTokenInit = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await getToken(messaging, { vapidKey: REACT_APP_FIREBASE_VAPID_KEY });
    if (currentToken) {
      console.log(currentToken);
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
