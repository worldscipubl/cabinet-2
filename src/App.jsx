import React, { useState } from "react";
import { Provider as StateProvider } from "react-redux";
import { AppRouter } from "./AppRouter";
import store from "./store";
import { onMessageListener } from "./firebaseInit";

export const App = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <StateProvider store={store}>
      <AppRouter />
    </StateProvider>
  );
};
