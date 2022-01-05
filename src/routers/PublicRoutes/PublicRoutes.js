import React from 'react';
import {Route} from "react-router-dom";
import AuthPage from "../../pages/AuthPage";

const PublicRoutes = () => [
    <Route path="/:tabId?" exact key="authPage">
        <AuthPage/>
    </Route>
];

export default PublicRoutes;
