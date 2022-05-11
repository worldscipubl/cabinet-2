import React, {useEffect, useState} from "react";
import { getTokenMessaging } from "./firebase";
import AppRouter from "./routers/AppRouter";
import PreloadingScreen from "./components/PreloadingScreen";
import Header from "./components/Header";
import withAppPresets from "./hoc/withAppPresets";
import EmptyState from "./domain/EmptyState";
import {useGetUserDataQuery, useGetUserQuery} from "./api/endpoints/UserApi";
import authApiFetch from "./api/ApiFetch/AuthApiFetch";

const App = () => {
  // const { data: user, error, isError, isLoading } = useGetUserQuery();
  // const { data } = useGetUserDataQuery();
  // if (data) {
  //   sessionStorage.setItem("current_user", JSON.stringify(data))
  // }


  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {

    if(localStorage.getItem('user_token')) {
      setIsLoading(true)
      authApiFetch.loginUser(localStorage.getItem('user_token'))
        .then(res => {
          setUser(res)
          setIsLoading(false)
          setError('')
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
          setError(err)
          setIsError(true)
        })

      setIsLoading(true)
      authApiFetch.getCurrentUser(localStorage.getItem('user_token'))
        .then(res => {
          setCurrentUser(res)
          sessionStorage.setItem("current_user", JSON.stringify(res))
          setIsLoading(false)
          setError('')
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
          setError(err)
          setIsError(true)
        })

    }
    localStorage.removeItem("error")
    localStorage.removeItem("success")


    getTokenMessaging()
      .then((currentToken) => {
        // console.log(currentToken);
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
