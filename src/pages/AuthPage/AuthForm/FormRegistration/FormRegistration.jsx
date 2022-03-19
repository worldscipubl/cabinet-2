import React, { useState } from "react";
import { Link } from "react-router-dom";
import constraints from "../../../../utils/constraints";
import FormErrorsBoard from "../FormErrorsBoard";
import TextField from "../../TextField";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import { useRegistrationUserMutation } from "../../../../api/endpoints/UserApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const FormRegistration = () => {
  const [regUser, { error: errorRegUser } = {}] = useRegistrationUserMutation();
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState({});
  const [checked, setChecked] = useState(false);

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
      return;
    } else {
      setErrors(null);
      return;
    }
  };
  const history = useHistory();
  const signUp = () => {
    regUser({ user: state })
      .unwrap()
      .then((res) => {
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckbox = (e) => {
    const value = e.target.checked;
    setChecked(value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!(state.name && state.email)) return;
    signUp();
  };

  return (
    <form className="auth-form" onSubmit={handleForm} noValidate>
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">
          Регистрация
        </h3>
        <p className="auth-form__description text text_size_accent">
          Введите свои учетные данные
        </p>

        {errors && errors.form && <FormErrorsBoard dataErrors={errors.form} />}

        <div className="auth-form__inputs">
          <div className="auth-form__input">
            <TextField
              label="Имя"
              error={!!(errors && errors.name)}
              helperText={errors && errors.name}
            >
              <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                onChange={(e) => handleChange(e)}
                value={state.name}
              />
            </TextField>
          </div>
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
              label="Телефон"
              error={!!(errors && errors.phone)}
              helperText={errors && errors.phone}
            >
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                required
                onChange={(e) => handleChange(e)}
                value={state.phone}
                pattern={constraints.phone.pattern}
              />
            </TextField>
          </div>
          <div className="auth-form__input">
            <Checkbox label="У меня есть купон">
              <input type="checkbox" onChange={(e) => handleCheckbox(e)} />
            </Checkbox>
          </div>
          <div className={`auth-form__input ${!checked && "hidden"}`}>
            <TextField
              label="Купон"
              error={!!(errors && errors.coupon)}
              helperText={errors && errors.coupon}
            >
              <input
                type="text"
                name="coupon"
                placeholder="Купон"
                onChange={(e) => handleChange(e)}
                value={state.coupon}
              />
            </TextField>
          </div>
        </div>

        <i className="divider" />
        <div className="auth-form__other">
          <div className="auth-form__other-item">
            <p className="text">Уже есть аккаунт?</p>
          </div>

          <div className="auth-form__other-item">
            <Link className="link" to="/auth">
              Войти
            </Link>
          </div>

          <div className="auth-form__other-item">|</div>

          <div className="auth-form__other-item">
            <Link className="link" to="/reset">
              Восстановить пароль
            </Link>
          </div>
        </div>
        <div className="auth-form__actions">
          <div className="auth-form__action">
            <button className="button button_type_main" type="submit">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormRegistration;
