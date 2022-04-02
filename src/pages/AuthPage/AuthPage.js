import React from "react";
import { useParams } from "react-router-dom";
import LoginLayout from "../../layouts/LoginLayout";
import AuthForm from "./AuthForm/AuthForm";

const AuthPage = () => {
  const { tabId } = useParams();

  return (
    <LoginLayout>
      <AuthForm tabId={tabId} />
    </LoginLayout>
  );
};

export default AuthPage;
