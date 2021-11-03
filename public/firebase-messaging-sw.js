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

messaging.getToken({ vapidKey: "BKpYzuendmlVgUbA2X0VMTL4xOV587JS4AegLdGk4aA7zP3yNgzRRmDalS1CDpQ6mbYM9Y2gfGXa9tG92xhys3w" })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log(currentToken);
      // ...
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };

  console.log("notificationTitle; ", notificationTitle);
  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
