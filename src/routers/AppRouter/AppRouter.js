import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes";
import PublicRoutes from "../PublicRoutes";
import NotFoundPage from "../../domain/NotFoundPage";

const AppRouter = ({ user }) => (
  <Switch>
    {user ? <PrivateRoutes /> : <PublicRoutes />}
    <Route>
      <NotFoundPage key="NotFoundPage" />
    </Route>
  </Switch>
);

export default AppRouter;
