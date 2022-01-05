import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./common/style/app.scss";
import Header from "./components/Header";
import MyArticles from "./pages/MyArticles";
import ReferralPage from "./pages/ReferralPage";
import HomePage from "./pages/HomePage";
import EducationPage from "./pages/Education";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./domain/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import PreloadingScreen from "./components/PreloadingScreen";
import NotificationsPage from "./pages/NotificationsPage";
import { useGetUserQuery } from "./api/endpoints/UserApi";
import ArticlePage from "./pages/ArticlePage";

export const AppRouter = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  const getPrivateRoutes = () => [
    <Route path="/" exact key="index">
      <Redirect to="/home" />
    </Route>,
    <Route path="/home" exact key="HomePage">
      <HomePage />
    </Route>,
    <Route path="/articles" exact key="MyArticles">
      <MyArticles />
    </Route>,
    <Route path="/article" exact key="ArticleRedirect">
      <Redirect to="/articles" />
    </Route>,
    <Route path="/article/:articleId?/:tabId?" key="ArticlePage">
      <ArticlePage />
    </Route>,
    <Route path="/referral/:tabId?" key="ReferralPage">
      <ReferralPage />
    </Route>,
    <Route path="/education" exact key="EducationPage">
      <EducationPage />
    </Route>,
    <Route path="/faq" exact key="FaqPage">
      <FaqPage />
    </Route>,
    <Route path="/notifications" exact key="NotificationsPage">
      <NotificationsPage />
    </Route>,
    <Route path="/settings" key="SettingsPage">
      <SettingsPage />
    </Route>
  ];

  const getPublicRoutes = () => [
    <Route path="/:tabId?" exact key="authPage">
      <AuthPage />
    </Route>
  ];

  const Routes = () => (
    <Switch>
      {user ? getPrivateRoutes() : getPublicRoutes()}
      <Route>
        <NotFoundPage key="NotFoundPage" />
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <div className="app">
        <PreloadingScreen isLoading={isLoading} />
        {user && <Header />}
        <Routes />
      </div>
    </BrowserRouter>
  );
};
