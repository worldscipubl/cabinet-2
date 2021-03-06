import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
// import constraints from "../../../../utils/constraints";
// import FormErrorsBoard from "../FormErrorsBoard";
import TextField from "../../TextField";
import { useLoginUserMutation } from "../../../../api/endpoints/UserApi";
import constraints from "../../../../utils/constraints";
import authApiFetch from "../../../../api/ApiFetch/AuthApiFetch";
// import styles from "../../../HomePage/HomePage.module.scss";
// import HomePageCardForm from "../../../HomePage/HomePageCardForm";
// import styles from './FormLogin.module.scss'
// import ErrorMessage from "../../../../components/ErrorMesage";

const FormLogin = () => {

  const [loginUser] = useLoginUserMutation();
  const history = useHistory();

  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
    }
  )

  const [errorMessage, setErrorMessage] = useState(
    {
      email: '',
      password: '',
    }
  )

  const [validityInput, setValidityInput] = useState(
    {
      email: false,
      password: false,
    }
  )

  if (localStorage.getItem("error") !== "Неверный e-mail или пароль. Попробуйте снова.") {
    localStorage.removeItem("error")
  }
  localStorage.removeItem("success-registration")

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!(validityInput.email && validityInput.password));
  }, [validityInput])

  const validation = (name, value) => {
    if(name === "password") {
      const Validity = value.length > 0
      Validity ? setErrorMessage(prevState => ({...prevState, password: ""})) : setErrorMessage(prevState => ({...prevState, password: "Введите пароль"}))
      Validity ? setValidityInput(prevState => ({...prevState, password: true})) : setValidityInput(prevState => ({...prevState, password: false}))
    } else {
      const Validity = value.match(constraints[name].pattern);
      Validity ? setErrorMessage(prevState => ({...prevState, [name]: ""})) : setErrorMessage(prevState => ({...prevState, [name]: constraints[name].messageError}))
      Validity ? setValidityInput(prevState => ({...prevState, [name]: true})) : setValidityInput(prevState => ({...prevState, [name]: false}))
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
    validation(name, value)

  };

  const handleForm = (e) => {
    e.preventDefault();
    signIn(loginState.email, loginState.password);
  };

  const signIn = (email, password) => {
    localStorage.removeItem("user_token")
    const userToken = window.btoa(email + ":" + password);

    authApiFetch.loginUser(userToken)
      .then(res => {
        localStorage.removeItem("error")
        localStorage.setItem("user_token", JSON.stringify(userToken));
        history.push("/");
        document.location.reload();
      })
      .catch(err => {
        history.push("/");
        document.location.reload();
        localStorage.setItem("error", "Неверный e-mail или пароль. Попробуйте снова.");
        localStorage.removeItem("user_token")
      })

    // loginUser(userToken)
    //   .unwrap()
    //   .then((res) => {
    //     localStorage.removeItem("error")
    //     localStorage.setItem("user_token", JSON.stringify(userToken));
    //     history.push("/");
    //     document.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     localStorage.setItem("error", "Неверный e-mail или пароль. Попробуйте снова.");
    //   });
  };

  return (

    <form className="auth-form" onSubmit={handleForm} noValidate>
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">Вход</h3>

        <p className="auth-form__description text text_size_accent">
          Введите свои учетные данные
        </p>
        <p className="auth-form__inputs text text_size_default text_color_red">{localStorage.getItem("error")}</p>

        <div className="auth-form__inputs">
          <div className="auth-form__input">
            <TextField
              label="Email"
              error={errorMessage.email}
              helperText={errorMessage.email}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={loginState.email}
              />
            </TextField>
          </div>
          <div className="auth-form__input">
            <TextField
              label="Пароль"
              error={errorMessage.password}
              helperText={errorMessage.password}
            >
              <input
                name="password"
                autoComplete="off"
                placeholder="Пароль"
                // required
                type="password"
                onChange={handleChange}
                value={loginState.password}
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
            <button className={!isValid ? "button button_type_main" : "button button_type_disabled"} type="submit" disabled={isValid}>
              Войти
            </button>
          </div>
        </div>
      </div>

    </form>

  );
};

export default FormLogin;
