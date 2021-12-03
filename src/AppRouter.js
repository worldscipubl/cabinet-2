import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./common/style/app.scss";
import Header from "./components/Header";
import MyArticles from "./pages/MyArticles";
import ArticlePage from "./pages/ArticlePage";
import ReferralPage from "./pages/ReferralPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./domain/NotFoundPage";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Forgot } from "./pages/Forgot/Forgot";
import MainLayout from "./layouts/MainLayout";
import SettingsPage from "./pages/SettingsPage";

export const AppRouter = () => {
  const [user] = useState(true);

  const getPrivateRoutes = () => [
    <Route path="/" exact key="index">
      <Redirect to="/article" />
    </Route>,
    <Route path="/article" exact key="MyArticles">
      <MainLayout>
        <MyArticles />
      </MainLayout>
    </Route>,
    <Route path="/article/:articleId?/:tabId?" key="ArticlePage">
      <MainLayout>
        <ArticlePage />
      </MainLayout>
    </Route>,
    <Route path="/referral/:tabId?" key="ReferralPage">
      <MainLayout>
        <ReferralPage />
      </MainLayout>
    </Route>,
    <Route path="/profile" key="ProfilePage">
      <MainLayout>
        <ProfilePage />
      </MainLayout>
    </Route>,
    <Route path="/chat" key="ChatPage">
      <MainLayout title="Чат">
        <ChatPage />
      </MainLayout>
    </Route>,
    <Route path="/faq" key="FaqPage">
      <MainLayout title="FAQ">
        <FaqPage />
      </MainLayout>
    </Route>,
    <Route path="/settings" key="SettingsPage">
      <MainLayout>
        <SettingsPage />
      </MainLayout>
    </Route>
  ];

  const getPublicRoutes = () => [
    <Route path="/" exact key="SignIn">
      <SignIn />
    </Route>,
    <Route path="/sign-up" key="SignUp">
      <SignUp />
    </Route>,
    <Route path="/forgot" key="Forgot">
      <Forgot />
    </Route>,
    <Route>
      <Redirect to="/" key="index" />
    </Route>
  ];

  const Routes = () => (
    <Switch>
      {user ? getPrivateRoutes() : getPublicRoutes()}
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <div className="app">
        {user && <Header />}
        <Routes />
      </div>
    </BrowserRouter>
  );
};
