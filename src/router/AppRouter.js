import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NotFoundPage } from "../domain/NotFoundPage/NotFoundPage";
import { Header } from "../components/Header/Header";
import { MainContent } from "../components/MainContent/MainContent";
import { Faq } from "../pages/Faq/Faq";
import { Profile } from "../pages/Profile/Profile";
import { Loyalty } from "../pages/Loyalty/Loyalty";
import { MyArticles } from "../pages/MyArticles/MyArticles";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Forgot } from "../pages/Forgot/Forgot";
import Article from "../pages/Article/Article";
import Chat from "../pages/Chat/Chat";

export const AppRouter = () => {
  const [user, setUser] = useState(true);

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <div className="app">
        {user && <Header />}
        {user ? (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/my-articles" />
            </Route>
            <Route path="/my-articles">
              <MainContent title="Мои статьи">
                <MyArticles />
              </MainContent>
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

            <Route path="/article/:id">
              <MainContent title="Статья №">
                <Article />
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
