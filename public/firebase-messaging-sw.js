// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCMwC-JWBe3imhXHUBmLG7ptfPGl74wtb0",
  authDomain: "worldscipubl-1de35.firebaseapp.com",
  projectId: "worldscipubl-1de35",
  storageBucket: "worldscipubl-1de35.appspot.com",
  messagingSenderId: "1008247938695",
  appId: "1:1008247938695:web:d773c7825775507d982222"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
