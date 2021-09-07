import React, { useState } from "react";
import TextField from "../../components/TextField/TextField";
import constraints from "../../utils/constraints";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import FormErrorsBoard from "../FormErrorsBoard/FormErrorsBoard";

const FormSignIn = () => {
  const [, setSubmitted] = useState(false);
  const [, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState({});
  const userService = new UserService();

  function handleChange(e) {
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
  }

  function handleForm(e) {
    e.preventDefault();
    setSubmitted(true);

    // stop here if form is invalid
    if (!(state.password && state.email)) {
      console.log("Form is invalid");
      return;
    }

    setLoading(true);
    signIn(state.email, state.password);
  }

  function signIn(email, password) {
    userService
      .signIn({ email, password })
      .then((userData) => {
        console.log(userData);
      })
      .catch((error) => {
        if (error.extras) setErrors({ ...errors, form: error.extras });
        else setErrors({ ...errors, form: error.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
                onChange={(e) => handleChange(e)}
                value={state.email}
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
                placeholder="Пароль"
                type="password"
                onChange={(e) => handleChange(e)}
                value={state.password}
                required
              />
            </TextField>
          </div>
        </div>

        <div className="divider"></div>
        <div className="auth-form__other">
          <span className="text text_weight_bold auth-form__other-item">
            Нет аккаунта?
          </span>
          <Link
            className="text text_size_default text_color_gray-blue auth-form__other-item"
            to="/sign-up"
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className="auth-form__actions">
          <div className="auth-form__action">
            <Link className="link" to="/forgot">
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

export default FormSignIn;
