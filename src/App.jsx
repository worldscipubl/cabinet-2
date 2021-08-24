import React from "react";
import { Provider as StateProvider } from "react-redux";
import "./common/style/app.scss";
import { AppRouter } from "./AppRouter";
import store from "./store";

export const App = () => {
  return (
    <StateProvider store={store}>
      <AppRouter />
    </StateProvider>
  );
};
