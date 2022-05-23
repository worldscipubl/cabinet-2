import React, {useEffect, useState} from "react";
import classNames from "classnames";
// import FormField from "../../../components/FormField";
// import Input from "../../../components/Input";
import CardHeadband from "../../../components/CardHeadband";
import EmptyState from "../../../domain/EmptyState";
import FieldAvatar from "../../../components/FieldAvatar";
// import {
//   useGetUserDataQuery,
//   useSetUserDataMutation,
// } from "../../../api/endpoints/UserApi";
import styles from "./ProfileData.module.scss";
import Loader from "../../../components/Loader";
import UserApiFetch from "../../../api/ApiFetch/UserApiFetch";
import {useHistory} from "react-router-dom";
// import Pencil from '../../../common/images/icons/pencil.svg'

// const fieldsProfile = [
//   {
//     name: "name",
//     label: "ФИО",
//     placeholder: "Укажите ФИО",
//   },
//   {
//     name: "birthday",
//     label: "Дата рождения",
//     placeholder: "Укажите дату рождения",
//   },
//   // {
//   //   // don't have
//   //   name: "phone",
//   //   label: "Номер телефона",
//   //   placeholder: "Укажите ваш телефон",
//   // },
//   {
//     name: "academicStatus",
//     label: "Академический статус: ",
//     placeholder: "Укажите академический статус",
//   },
//   {
//     name: "post",
//     label: "Должность",
//     placeholder: "Укажите должность",
//   },
//   {
//     // don't have
//     name: "country",
//     label: "Страна",
//     placeholder: "Укажите вашу страну",
//   },
// ];

const ProfileData = () => {

  const history = useHistory()

  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect( () => {
    setIsLoading(true)
    setError(false)
    UserApiFetch.getCurrentUser(localStorage.getItem("user_token"))
      .then( res => {
        setCurrentUser(res)
        setIsLoading(false)
        setError(false)
      })
      .catch( err => {
        console.log(err)
        setIsLoading(false)
        setError(true)
      })

      history.push(`/settings/profile`)
  },[])

  const formatDate = (date) => {
    let d = new Date(Number(date+"000"))
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('.');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    UserApiFetch.setCurrentUser(localStorage.getItem("user_token"), currentUser )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputOpen = (name) => {
    document.getElementById(name).focus();
  }

  if (error)
    return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error.message}
      >
        <button
          className="button button_type_main"
          onClick={() => document.location.reload()}
        >
          Обновить страницу
        </button>
      </EmptyState>
    );

  function handleChange(e) {
    if(e.target.name === "birthday") {
      const name = e.target.name;
      const value = new Date(e.target.value).getTime() / 1000 | 0;
      setCurrentUser(prevState => ({...prevState, [name]: value}));
    } else {
      const {name, value} = e.target;
      setCurrentUser(prevState => ({...prevState, [name]: value}));
    }
  }

  if (isLoading) return  <Loader isLoading={isLoading}/>

  return (
    <CardHeadband title="Данные профиля">
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <FieldAvatar className={classNames(styles.settings__avatar)} />
        </div>

          <form className={styles.profile__form}>
            <label className={styles.form__label}>
              <span className="text text-field__label">ФИО</span>
              <div className={styles.form__inputWrapper}>
                <input type="text"
                       id="name"
                       name="name"
                       placeholder="Укажите ФИО"
                       className={classNames("text textField__input", styles.form__input)}
                       value={currentUser.name}
                       onChange={handleChange}
                />
                <button type="button" className={styles.form__inputButton} onClick={() => inputOpen("name", false)}></button>
              </div>
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Дата рождения</span>
              <div className={styles.form__inputWrapper}>
                <input
                  type="text"
                  id="birthday"
                  name="birthday"
                  placeholder={formatDate(currentUser.birthday) || "Укажите дату рождения"}
                  onChange={handleChange}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  className={classNames("text textField__input", styles.form__input)}
                />
                <button type="button" className={styles.form__inputButton} onClick={() => inputOpen("birthday", false)}></button>
              </div>
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Академический статус</span>
              <div className={styles.form__inputWrapper}>
                <input type="text"
                       id="academicStatus"
                       name="academicStatus"
                       placeholder="Укажите академический статус"
                       className={classNames("text textField__input", styles.form__input)}
                       value={currentUser.academicStatus}
                       onChange={handleChange}
                />
                <button type="button" className={styles.form__inputButton} onClick={() => inputOpen("academicStatus", false)}></button>
              </div>
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Должность</span>
              <div className={styles.form__inputWrapper}>
                <input type="text"
                       id="post"
                       name="post"
                       placeholder="Укажите должность"
                       className={classNames("text textField__input", styles.form__input)}
                       value={currentUser.post}
                       onChange={handleChange}

                />
                <button type="button" className={styles.form__inputButton} onClick={() => inputOpen("post", false)}></button>
              </div>
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Страна</span>
              <div className={styles.form__inputWrapper}>
                <input type="text"
                       id="country"
                       name="country"
                       placeholder="Укажите вашу страну"
                       className={classNames("text textField__input", styles.form__input)}
                       value={currentUser.country}
                       onChange={handleChange}
                />
                <button type="button" className={styles.form__inputButton} onClick={() => inputOpen("country", false)}></button>
              </div>
            </label>

            <button type="submit"
                    aria-label="submit"
                    className={classNames("button button_type_tabs active", styles.form__submitButton)}
                    name="form_submit"
                    onClick={handleSubmit}>
              Сохранить
            </button>
          </form>
</div>

     </CardHeadband>
  );
};

export default ProfileData;
