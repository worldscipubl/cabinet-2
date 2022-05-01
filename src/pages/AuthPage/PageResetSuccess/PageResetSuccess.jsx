import React from "react";

const PageResetSuccess = ({email}) => {
	console.log(email);
	const printEmail = localStorage.getItem("emailes");
  return (
    <div className="auth-form__inner">
      <h3 className="auth-form__title text text_size_subtitle">
        Восстановление пароля
      </h3>
      <p className="auth-form__description text text_size_accent">
        Ссылка направлена на Вашу почту
        <br/>
        Проверьте Ваш почтовый ящик
      </p>
    </div>
  );
};

export default PageResetSuccess;
