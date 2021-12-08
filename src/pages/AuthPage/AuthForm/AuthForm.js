import React from "react";
import FormReset from "./FormReset";
import FormRegistration from "./FormRegistration";
import FormLogin from "./FormLogin";
import "./AuthForm.scss";

const AuthForm = ({ tabId }) => {
  switch (tabId) {
    case "reset":
      return <FormReset />;
    case "sign-up":
      return <FormRegistration />;
    default :
      return <FormLogin />;
  }
};

export default AuthForm;
