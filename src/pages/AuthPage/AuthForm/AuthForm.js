import React, { useState } from "react";
import FormReset from "./FormReset";
import FormRegistration from "./FormRegistration";
import FormLogin from "./FormLogin";
import "./AuthForm.scss";
import PageResetPassword from "../PageResetPassword";
import PageRegSuccess from "./PageRegSuccess";
import PageResetSuccess from "../PageResetSuccess/PageResetSuccess";

const AuthForm = ({ tabId }) => {
  const [email, setEmail] = useState('')

const handleEmailChange = (email) => {
 setEmail(email)
};


  switch (tabId) {
    case "reset":
      return <FormReset onChange={handleEmailChange} />;
    case "sing-up":
      return <FormRegistration />;
    case "reset-password":
      return <PageResetPassword />;
    case "sing-up-success":
      return <PageRegSuccess />;
    case "reset-success":
      return <PageResetSuccess email={email} />;
    // case "reset-unsuccess":
    //   return <PageResetUnseccess />;
    default:
      return <FormLogin />;
  }
};

export default AuthForm;
