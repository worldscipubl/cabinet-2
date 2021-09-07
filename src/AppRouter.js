import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NotFoundPage } from "./domain/NotFoundPage/NotFoundPage";
import { Faq } from "./pages/Faq/Faq";
import { Profile } from "./pages/Profile/Profile";
import { Loyalty } from "./pages/Loyalty/Loyalty";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Forgot } from "./pages/Forgot/Forgot";
import Chat from "./pages/Chat/Chat";
import { Header } from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ArticlePage from "./pages/ArticlePage/ArticlePage";

export const AppRouter = () => {
  const [user] = useState(true);

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <div className="app">
        {user && <Header />}
        {user ? (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/article" />

            </Route>

            <Route path="/article/:articleId?/:tabId?">
              <ArticlePage />
            </Route>

            <Route path="/loyalty">
              <MainContent title="Программа лояльности">
                <Loyalty />
              </MainContent>
            </Route>
            <Route path="/profile">
              <MainContent title="Партнерка">
                <Profile />
              </MainContent>
            </Route>
            <Route path="/faq">
              <MainContent title="FAQ">
                <Faq />
              </MainContent>
            </Route>

            <Route path="/chat">
              <MainContent title="Чат">
                <Chat />
              </MainContent>
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact>
              <SignIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/forgot">
              <Forgot />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
};
