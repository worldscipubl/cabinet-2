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

  const profileForm = document.forms.profileform

  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    setIsLoading(true)
    UserApiFetch.getCurrentUser(localStorage.getItem("user_token"))
      .then( res => {
        setCurrentUser(res)
        setIsLoading(false)
      })
      .catch( err => {
        console.log(err)
        setIsLoading(false)
      })
  },[])

  console.log(currentUser)

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

  // const [mutation, { error: errorSubmit } = {}] = useSetUserDataMutation();

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

  // if (error)
  //   return (
  //     <EmptyState
  //       type="warning"
  //       title="Упс... Произошла ошибка!"
  //       description={error.message}
  //     >
  //       <button
  //         className="button button_type_main"
  //         onClick={() => document.location.reload()}
  //       >
  //         Обновить страницу
  //       </button>
  //     </EmptyState>
  //   );

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

          <form name="profileform" className={styles.profile__form}>
            <label className={styles.form__label}>
              <span className="text text-field__label">ФИО</span>
              <input type="text"
                     name="name"
                     placeholder="Укажите ФИО"
                     className={classNames("text textField__input", styles.form__input)}
                     value={currentUser.name}
                     onChange={handleChange}
              />
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Дата рождения</span>

              <input
                type="text"
                name="birthday"
                placeholder={formatDate(currentUser.birthday) || "Укажите дату рождения"}
                onChange={handleChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className={classNames("text textField__input", styles.form__input)}
              />
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Академический статус</span>
              <input type="text"
                     name="academicStatus"
                     placeholder="Укажите академический статус"
                     className={classNames("text textField__input", styles.form__input)}
                     value={currentUser.academicStatus}
                     onChange={handleChange}
              />
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Должность</span>
              <input type="text"
                     name="post"
                     placeholder="Укажите должность"
                     className={classNames("text textField__input", styles.form__input)}
                     value={currentUser.post}
                     onChange={handleChange}
              />
            </label>

            <label className={styles.form__label}>
              <span className="text text-field__label">Страна</span>
              <input type="text"
                     name="country"
                     placeholder="Укажите вашу страну"
                     className={classNames("text textField__input", styles.form__input)}
                     value={currentUser.country}
                     onChange={handleChange}
              />
            </label>

            <button type="submit" aria-label="submit" className="button button_type_tabs active" name="form_submit" onClick={handleSubmit}>
              Сохранить
            </button>
          </form>

</div>
          {/*<button type="submit" aria-label="submit" className="button button_type_tabs active" name="form_submit" onClick={handleSubmit}>*/}
          {/*  Сохранить*/}
          {/*</button>*/}

     </CardHeadband>
  );
};

export default ProfileData;
