import React from "react";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import MyArticles from "../../pages/MyArticles";
import ArticlePage from "../../pages/ArticlePage";
import ReferralPage from "../../pages/ReferralPage";
import EducationPage from "../../pages/Education";
import FaqPage from "../../pages/FaqPage";
import NotificationsPage from "../../pages/NotificationsPage";
import SettingsPage from "../../pages/SettingsPage";
import NewArticlePage from "../../pages/NewArticlePage";

const   PrivateRoutes = () => [
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
  <Route path="/article/:articleId?/:contractNumber?/:tabId?" key="ArticlePage">
    <ArticlePage />
  </Route>,

  <Route path="/new-article" key="NewArticlePage">
    <NewArticlePage />
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
  </Route>,
];

export default PrivateRoutes;
