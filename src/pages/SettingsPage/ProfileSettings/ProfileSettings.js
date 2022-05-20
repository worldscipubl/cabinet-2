import React, {useEffect} from "react";
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";
import FormFieldContainer from "../../../components/FormFieldContainer";
import CardList from "../../../components/CardList";
import DialogResetPassword from "../../../components/DialogResetPassword";
import {useHistory} from "react-router-dom";

const ProfileSettings = () => {

  const history = useHistory()
  useEffect( () => {
    history.push(`/settings/profile-settings`)
  },[])

  return (
    <CardHeadband title="Настройки профиля">
      <FormFieldContainer
        className=" brief-form__title"
        label="Ваши карты"
        description="Вы можете добавить или удалить карту, привязанную к вашему профилю"
      >
        <CardList />
      </FormFieldContainer>

      <FormFieldRow
        className=" brief-form__title"
        label=" Пароль"
        description=" Введите новый, если хотите изменить"
      >
        <DialogResetPassword />
      </FormFieldRow>
    </CardHeadband>
  );
};

export default ProfileSettings;
