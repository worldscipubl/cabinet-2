import React, { useState } from "react";
import "./common/style/app.scss";
import { AppRouter } from "./router/AppRouter";
import ErrorBoundary from "./domain/ErrorBoundary/ErrorBoundary";
import { LaunchScreen } from "./domain/LaunchScreen/LaunchScreen";

export const App = () => {
  const [ready, setReady] = useState(true);
  return (
    <ErrorBoundary>
      {!ready && <LaunchScreen />}

      {ready && <AppRouter />}
    </ErrorBoundary>
  );
};
