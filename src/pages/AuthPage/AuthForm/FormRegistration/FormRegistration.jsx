import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import constraints from "../../../../utils/constraints";
// import FormErrorsBoard from "../FormErrorsBoard";
import TextField from "../../TextField";
// import Checkbox from "../../../../components/Checkbox/Checkbox";
import { useRegistrationUserMutation } from "../../../../api/endpoints/UserApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCookie } from "../../../../utils/functions";
import './FormRegistration.modules.scss'
import classNames from "classnames";

const FormRegistration = () => {
  const [regUser, { error: errorRegUser } = {}] = useRegistrationUserMutation();
  // const [errors, setErrors] = useState(null);
  // const [state, setState] = useState({});
  // const [checked, setChecked] = useState(false);
  const partnerId = getCookie("partnerId");
  const history = useHistory();

  if (localStorage.getItem("error") !== "Пользователь с таким e-mail уже зарегистрирован. Попробуйте снова.") {
    localStorage.removeItem("error")
  }

  const [registerState, setRegisterState] = useState(
    {
      name: '',
      email: '',
      phone: '',
      partnerId: partnerId,
    }
  )

  const [isValid, setIsValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("")
  const [errorMessageName, setErrorMessageName] = useState("")
  const [errorMessagePhone, setErrorMessagePhone] = useState("")


  useEffect(() => {
    const emailValidity = registerState.email.match(/^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/);
    const phoneValidity = registerState.phone.match(constraints.phone.pattern) && registerState.phone>=10000000000;
    const nameValidity = registerState.name.match(/^[а-яА-ЯёЁa-zA-Z_\ ]{2,60}$/);
    emailValidity ? setErrorMessageEmail("") : setErrorMessageEmail("Поле не должно быть пустым и должно содержать корректный e-mail")
    nameValidity ? setErrorMessageName("") : setErrorMessageName("Введите имя (кирилица, латиница и пробел, длиной от 2 до 60 символов)")
    phoneValidity ? setErrorMessagePhone("") : setErrorMessagePhone(constraints.phone.msg)

    setIsValid(!!(emailValidity && nameValidity && phoneValidity));
  }, [registerState.email, registerState.name, registerState.phone])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterState(prevState => ({...prevState, [name]: value}));
    if(localStorage.getItem("error")) {
      localStorage.removeItem("error")
    }
  };

  const signUp = () => {
    localStorage.removeItem("success-registration");
    regUser({
      user: { ...registerState },
    })
      .unwrap()
      .then((res) => {
        localStorage.removeItem("error")
        localStorage.setItem("success-registration", "Вы успешно зарегистрировались. Пароль отправлен на Вашу почту");
      })
      .catch((error) => {
        console.log(error)
      if (error.toString().includes("зарегистрирован")) {
        localStorage.setItem("error", "Пользователь с таким e-mail уже зарегистрирован. Попробуйте снова.");
      }
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    signUp()
  };

  //Если еще не зарегистрировались
  if (!localStorage.getItem("success-registration")) {
    return (
      <form className="auth-form" onSubmit={handleForm} noValidate>
        <div className="auth-form__inner">
          <h3 className="auth-form__title text text_size_subtitle">
            Регистрация
          </h3>

          <p className="auth-form__description text text_size_accent">
            Введите свои учетные данные
          </p>

          <p className="auth-form__inputs text text_size_default text_color_red">{localStorage.getItem("error")}</p>

          <div className="auth-form__inputs">
            <div className="auth-form__input">
              <TextField
                label="Имя"
                error={errorMessageName}
                helperText={errorMessageName}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  onChange={handleChange}
                  value={registerState.name}
                />
              </TextField>
            </div>
            <div className="auth-form__input">
              <TextField
                label="Email"
                error={errorMessageEmail}
                helperText={errorMessageEmail}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={registerState.email}
                />
              </TextField>
            </div>
            <div className="auth-form__input">
              <TextField
                label="Телефон"
                error={errorMessagePhone}
                helperText={errorMessagePhone}
              >
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  required
                  onChange={handleChange}
                  value={registerState.phone}
                />
              </TextField>
            </div>
          </div>

          <i className="divider"/>
          <p className="auth-form__margin-0 text text_size_default">{localStorage.getItem("success-registration")}</p>
          <div className={classNames("auth-form__other", "form__other")}>
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
              <button className={isValid ? "button button_type_main" : "button button_type_disabled"} type="submit" disabled={!isValid}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  //Если успешная регистрация
  if (localStorage.getItem("success-registration")) {
    return (
      <form className="auth-form" onSubmit={handleForm} noValidate>
        <div className="auth-form__inner">
          <h3 className="auth-form__title text text_size_subtitle">
            Регистрация
          </h3>
          <i className="divider"/>
          <p className="auth-form__margin-0 text text_size_default">{localStorage.getItem("success-registration")}</p>
          <div className={classNames("auth-form__other", "form__other")}>
            <h6 className="">
              <Link className="link" to="/auth">
                Войти в личный кабинет
              </Link>
            </h6>


          </div>

        </div>
      </form>
    );
  }










};

export default FormRegistration;
