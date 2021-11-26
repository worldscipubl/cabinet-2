import React, { useEffect } from "react";
import { Provider as StateProvider } from "react-redux";
import { AppRouter } from "./AppRouter";
import store from "./store";
import { getTokenMessaging, onMessageListener } from "./firebase";

export const App = () => {

  useEffect(() => {
    getTokenMessaging()
      .then((currentToken) => {
        console.log(currentToken);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });

    onMessageListener()
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });
  }, []);

  return (
    <StateProvider store={store}>
      <AppRouter />
    </StateProvider>
  );
};
