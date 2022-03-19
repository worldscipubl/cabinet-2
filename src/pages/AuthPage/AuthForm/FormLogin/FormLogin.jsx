import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import constraints from "../../../../utils/constraints";
import FormErrorsBoard from "../FormErrorsBoard";
import TextField from "../../TextField";
import { useLoginUserMutation } from "../../../../api/endpoints/UserApi";

const FormLogin = () => {
  const [loginUser, { error: errorLoginUser } = {}] = useLoginUserMutation();
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;
    const { name, value } = input;
    if (!name) return;

    setState({ ...state, [name]: value });

    if (!isValid) {
      constraints[name] &&
      setErrors({ ...errors, [name]: constraints[name].msg });
    } else {
      setErrors(null);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (!(state.password && state.email)) return;

    signIn(state.email, state.password);
  };

  const signIn = (email, password) => {
    const userToken = window.btoa(email + ":" + password);
    loginUser(userToken).unwrap()
      .then((res) => {
        localStorage.setItem("user_token", JSON.stringify(userToken));
        history.push("/");
        document.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="auth-form" onSubmit={handleForm} noValidate>
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">Вход</h3>

        <p className="auth-form__description text text_size_accent">
          Введите свои учетные данные
        </p>

        {errors && errors.form && <FormErrorsBoard dataErrors={errors.form} />}

        <div className="auth-form__inputs">
          <div className="auth-form__input">
            <TextField
              label="Email"
              error={!!(errors && errors.email)}
              helperText={errors && errors.email}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                value={state?.email || ""}
                pattern={constraints.email.pattern}
              />
            </TextField>
          </div>
          <div className="auth-form__input">
            <TextField
              label="Пароль"
              error={!!(errors && errors.password)}
              helperText={errors && errors.password}
            >
              <input
                name="password"
                autoComplete="on"
                placeholder="Пароль"
                type="password"
                onChange={handleChange}
                value={state?.password || ""}
                required
              />
            </TextField>
          </div>
        </div>

        <i className="divider" />
        <div className="auth-form__other">
          <span className="text text_weight_bold auth-form__other-item">
            Нет аккаунта?
          </span>
          <Link
            className="text text_size_default text_color_gray-blue auth-form__other-item"
            to="/sing-up"
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className="auth-form__actions">
          <div className="auth-form__action">
            <Link className="link" to="/reset">
              Восстановить пароль
            </Link>
          </div>
          <div className="auth-form__action">
            <button className="button button_type_main" type="submit">
              Войти
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormLogin;
