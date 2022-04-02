import React, { useEffect } from "react";
import { getTokenMessaging } from "./firebase";
import AppRouter from "./routers/AppRouter";
import PreloadingScreen from "./components/PreloadingScreen";
import Header from "./components/Header";
import withAppPresets from "./hoc/withAppPresets";
import EmptyState from "./domain/EmptyState";
import { useGetUserQuery } from "./api/endpoints/UserApi";

const App = () => {
  const { data: user, error, isError, isLoading } = useGetUserQuery();

  useEffect(() => {
    getTokenMessaging()
      .then((currentToken) => {
        console.log(currentToken);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });
  }, []);

  if (isLoading) return <PreloadingScreen isLoading={isLoading} />;

  if (isError && error?.status !== 401)
    return (
      <EmptyState
        fullScreen={true}
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error?.message}
      >
        <button
          className="button button_type_main"
          onClick={() => document.location.reload()}
        >
          Обновить страницу
        </button>
      </EmptyState>
    );

  return (
    <div className="app">
      <Header user={user} />
      <AppRouter user={user} />
    </div>
  );
};

export default withAppPresets(App);
