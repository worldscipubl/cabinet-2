import React from "react";
import "./SignIn.scss";
import { LoginLayout } from "../../layouts/LoginLayout/LoginLayout";
import FormSignIn from "../../forms/FormSignIn/FormSignIn";

export const SignIn = (props) => {
  return (
    <LoginLayout>
      <FormSignIn />
    </LoginLayout>
  );
};
