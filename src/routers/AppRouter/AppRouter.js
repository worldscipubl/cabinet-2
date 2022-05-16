import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes";
import PublicRoutes from "../PublicRoutes";
import NotFoundPage from "../../domain/NotFoundPage";
import FormReset from "../../pages/AuthPage/AuthForm/FormReset";

const AppRouter = ({ user }) => (
  <Switch>
    {user ? <PrivateRoutes /> : <PublicRoutes />}
    <Route path="/sing-up">
      <FormReset />
    </Route>



    <Route path="*">
      <NotFoundPage key="NotFoundPage" />
    </Route>
  </Switch>
);

export default AppRouter;
