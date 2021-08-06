import React from "react";
import "./Forgot.scss";
import { LoginLayout } from "../../layouts/LoginLayout/LoginLayout";
import FormForgot from "../../forms/FormForgot/FormForgot";

export const Forgot = (props) => {
  return (
    <LoginLayout>
      <FormForgot />
    </LoginLayout>
  );
};
