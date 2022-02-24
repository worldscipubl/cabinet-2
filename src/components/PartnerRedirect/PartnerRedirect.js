import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {setCookie} from "../../utils/functions";


const PartnerRedirect = () => {
    const { partnerId } = useParams();

    const options = {
        domain: 'worldscipubl.com', // localhost
        path: '/',
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 365).toUTCString(),
        secure: true
    };
    setCookie("partnerId", partnerId, options);

    return (
        <Redirect to="/"/>
    );
};

export default PartnerRedirect;