import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import constraints from "../../utils/constraints";
import UserService from "../../services/UserService";

const FormForgot = () => {
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

    setState({ [name]: value });

    if (!isValid) {
      setErrors({ ...errors, [name]: constraints[name].msg });
      return;
    } else {
      setErrors(null);
      return;
    }
  }

  function handleForm(e) {
    e.preventDefault();
    setSubmitted(true);
    // stop here if form is invalid
    if (!(state.name && state.email)) {
      console.log("name: ", state.name);
      console.log("email: ", state.email);
      return;
    }

    setLoading(true);

    userService.signUp({ name: state.name, email: state.email }).then(
      (userData) => {
        console.log(userData);
        setLoading(false);
      },
      (error) => {
        setErrors(error);
        setLoading(false);
      }
    );
  }

  return (
    <form className="auth-form" onSubmit={handleForm}>
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">
          Забыли свой пароль?
        </h3>
        <p className="auth-form__description text text_size_accent">
          Воспользуйтесь формой ниже, чтобы восстановить его.
        </p>

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
        </div>

        <div className="divider"></div>
        <div className="auth-form__other">
          <h6 className="">
            <Link className="link" to="/">
              Войти в личный кабинет
            </Link>
          </h6>
        </div>
        <div className="auth-form__actions">
          <div className="auth-form__action">
            <button className="button button_type_main" type="submit">
              Восстановить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormForgot;
