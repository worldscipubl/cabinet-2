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

export const AppRouter = () => {
  const [user] = useState(true);

  const getPrivateRoutes = () => [
    <Route path="/" exact>
      <Redirect to="/article" />
    </Route>,
    <Route path="/article" exact>
      <MainLayout>
        <MyArticles />
      </MainLayout>
    </Route>,
    <Route path="/article/:articleId?/:tabId?">
      <MainLayout>
        <ArticlePage />
      </MainLayout>
    </Route>,
    <Route path="/referral">
      <MainLayout>
        <ReferralPage />
      </MainLayout>
    </Route>,
    <Route path="/profile">
      <MainLayout title="Партнерка">
        <ProfilePage />
      </MainLayout>
    </Route>,
    <Route path="/chat">
      <MainLayout title="Чат">
        <ChatPage />
      </MainLayout>
    </Route>,
    <Route path="/faq">
      <MainLayout title="FAQ">
        <FaqPage />
      </MainLayout>
    </Route>
  ];

  const getPublicRoutes = () => [
    <Route path="/" exact>
      <SignIn />
    </Route>,
    <Route path="/sign-up">
      <SignUp />
    </Route>,
    <Route path="/forgot">
      <Forgot />
    </Route>,
    <Route>
      <Redirect to="/" />
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
