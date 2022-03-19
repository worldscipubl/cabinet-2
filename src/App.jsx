import React, { useEffect } from "react";
import { getTokenMessaging } from "./firebase";
import AppRouter from "./routers/AppRouter";
import PreloadingScreen from "./components/PreloadingScreen";
import Header from "./components/Header";
import withAppPresets from "./hoc/withAppPresets";
import EmptyState from "./domain/EmptyState";
import { useGetUserQuery } from "./api/endpoints/UserApi";

const App = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  useEffect(() => {
    getTokenMessaging()
      .then((currentToken) => {
        console.log(currentToken);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });
  }, []);

  if (isLoading && !error) return <PreloadingScreen isLoading={isLoading} />;

  return (
    <div className="app">
      <Header isShow={!!user} />
      <AppRouter user={user} />
    </div>
  );
};

export default withAppPresets(App);
