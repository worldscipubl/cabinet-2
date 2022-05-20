import React, {useEffect} from "react";
import classNames from "classnames";
import FormField from "../../../components/FormField";
import Input from "../../../components/Input";
import CardHeadband from "../../../components/CardHeadband";
import EmptyState from "../../../domain/EmptyState";
import FieldAvatar from "../../../components/FieldAvatar";
import {
  useGetUserDataQuery,
  useSetUserDataMutation,
} from "../../../api/endpoints/UserApi";
import styles from "../SettingsPage.module.scss";
import {useHistory} from "react-router-dom";

const fieldsProfile = [
  {
    name: "name",
    label: "ФИО",
    placeholder: "Укажите ФИО",
  },
  {
    name: "birthday",
    label: "Дата рождения",
    placeholder: "Укажите дату рождения",
    type: "data"
  },
  {
    // don't have
    name: "phone",
    label: "Номер телефона",
    placeholder: "Укажите ваш телефон",
  },
  {
    name: "academicStatus",
    label: "Академический статус: ",
    placeholder: "Укажите академический статус",
  },
  {
    name: "post",
    label: "Должность",
    placeholder: "Укажите должность",
  },
  {
    // don't have
    name: "country",
    label: "Страна",
    placeholder: "Укажите вашу страну",
  },
];

const ProfileDataTest = ({user}) => {

  const history = useHistory()
  useEffect( () => {
    history.push(`/settings/profile-test`)
  },[])

  const { data, error, isLoading } = useGetUserDataQuery();
  const [mutation, { error: errorSubmit } = {}] = useSetUserDataMutation();

  const handleFieldSubmit = async (nameField, valueField) => {
    if (!valueField) return;

    const data = { [nameField]: valueField };

    console.log(data)
    return await mutation({ data }).unwrap();
  };

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

  return (
    <CardHeadband title="Данные профиля">
      <div className={classNames(styles.settings__avatarGroup)}>
        <FieldAvatar className={classNames(styles.settings__avatar)} user={user} />
        <div className={classNames(styles.settings__avatarForm, {})}>
          {/*{fieldsProfile.map((field) => (*/}
          {/*  <FormField*/}
          {/*    className={classNames(styles.settings__input, {})}*/}
          {/*    name={field?.name}*/}
          {/*    key={field?.name}*/}
          {/*    label={field?.label}*/}
          {/*    isLoading={isLoading}*/}
          {/*    description={field?.description}*/}
          {/*    defaultValue={data?.[field?.name]}*/}
          {/*    propsInput={{*/}
          {/*      type: field?.type || "text",*/}
          {/*      placeholder: field?.placeholder,*/}
          {/*      required: true,*/}
          {/*      multiple: !!(field?.type === "file"),*/}
          {/*    }}*/}
          {/*    component={<Input />}*/}
          {/*    handlers={{ handleFieldSubmit }}*/}
          {/*  />*/}
          {/*))}*/}


          <form action="#" encType="multipart/form-data">
            <p >We are ready </p>


            <label className="form__label">
              <span>Дата рождения</span>
              <input type="date"
                     name="birthday"
                     placeholder="Укажите дату рождения"/>
            </label>






                <button type="submit" aria-label="submit" className="app__button form__button" name="form_submit">
                  Send
                </button>
          </form>


        </div>
      </div>
    </CardHeadband>
  );
};

export default ProfileDataTest;
