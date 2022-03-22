import React from "react";
import FormReset from "./FormReset";
import FormRegistration from "./FormRegistration";
import FormLogin from "./FormLogin";
import "./AuthForm.scss";
import PageResetPassword from "../PageResetPassword/PageResetPassword";

const AuthForm = ({ tabId }) => {
  switch (tabId) {
    case "reset":
      return <FormReset />;
    case "sing-up":
      return <FormRegistration />;
    case "reset-password":
      return <PageResetPassword />;
    // case "sing-up-secсess":
    //   return <PageRegSuccess />;
    default:
      return <FormLogin />;
  }
};

export default AuthForm;
