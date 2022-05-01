import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useResetUserTokenQuery } from "../../../api/endpoints/UserApi";

const PageResetPassword = () => {
  const location = useLocation();
  const locationSearch = location.search;
  let params = new URLSearchParams(locationSearch);
  let token = params.get("t");

  const { resetToken, isError, error, isSuccess } = useResetUserTokenQuery(token);

  if (isError)
    return (
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">
          Восстановление пароля
        </h3>
        <p className="auth-form__description text text_size_accent">
          Ссылка для восстановления пароля недействительна.
          <br /> Попробуйте еще раз.
        </p>
        <div className="auth-form__actions">
          <div className="auth-form__other-item">
            <Link className="button button_type_main" to="/reset">
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    );
  return (
    <div className="auth-form__inner">
      <h1>Восстановление пароля</h1>
      <p className="auth-form__description text text_size_accent">
        Новый пароль отправлен на Вашу почту
      </p>
    </div>
  );
};

export default PageResetPassword;
