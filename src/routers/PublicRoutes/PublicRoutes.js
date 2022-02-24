import React from 'react';
import {Route} from "react-router-dom";
import AuthPage from "../../pages/AuthPage";
import PartnerRedirect from "../../components/PartnerRedirect";

const PublicRoutes = () => [
    <Route path="/partner/:partnerId" exact key="partnerPage">
        <PartnerRedirect/>
    </Route>,
    <Route path="/:tabId?" exact key="authPage">
        <AuthPage/>
    </Route>
];

export default PublicRoutes;
