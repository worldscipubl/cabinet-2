import React from "react";
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
import MainLayout from "./layouts/MainLayout";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import { useGetUserQuery } from "./api/endpoints/UserApi";
import PreloadingScreen from "./components/PreloadingScreen";

export const AppRouter = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

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
