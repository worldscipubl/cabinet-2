import React from 'react';
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";

const ProfileSettings = () => {

    return (
        <CardHeadband title="Настройки профиля:">
            <FormFieldRow className="brief-form__title" label="Карта оплаты">
                <button className="button button_type_tabs">
                    Добавить
                </button>
            </FormFieldRow>
            <FormFieldRow className="brief-form__title"
                          label="Пароль"
                          description="Введите новый, если хотите изменить">
                <button className="button button_type_tabs">
                    Изменить
                </button>
            </FormFieldRow>
        </CardHeadband>
    );
};

export default ProfileSettings;
