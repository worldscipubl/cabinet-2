import React from "react";
import "./SignUp.scss";
import { LoginLayout } from "../../layouts/LoginLayout/LoginLayout";
import FormSignUp from "../../forms/FormSignUp/FormSignUp";

export const SignUp = (props) => {
  return (
    <LoginLayout>
      <FormSignUp />
    </LoginLayout>
  );
};
