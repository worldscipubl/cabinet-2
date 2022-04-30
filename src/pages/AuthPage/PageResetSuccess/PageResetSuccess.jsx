import React from "react";

const PageResetSuccess = ({email}) => {
	console.log(email);
	const printEmail = localStorage.getItem("emailes");
  return (
    <div className="auth-form__inner">
      <h1>Восстановление пароля</h1>
      <p className="auth-form__description text text_size_accent">
        Новый пароль отправлен на Вашу почту {email} {printEmail}
      </p>
    </div>
  );
};

export default PageResetSuccess;
