import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

export const AppRouter = () => {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        {user && <Header />}
        {user ? (
          <Switch>
            <Route path="/" exact>
              <MainContent>
                <h2>Index page </h2>
              </MainContent>
            </Route>
            <Route path="/my-articles">
              <MainContent>
                <MyArticles />
              </MainContent>
            </Route>
            <Route path="/loyalty">
              <MainContent>
                <Loyalty />
              </MainContent>
            </Route>
            <Route path="/profile">
              <MainContent>
                <Profile />
              </MainContent>
            </Route>
            <Route path="/faq">
              <MainContent>
                <Faq />
              </MainContent>
            </Route>

            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/forgot">
              <Forgot />
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
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
};
