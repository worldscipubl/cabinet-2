import React from 'react';
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";
import {useGetWalletsQuery} from "../../../api/endpoints/WalletsApi";
import FormFieldContainer from "../../../components/FormFieldContainer";

const ProfileSettings = () => {
    const {data, error, isLoading} = useGetWalletsQuery();
    return (
        <CardHeadband title="Настройки профиля">
            <FormFieldContainer className="brief-form__title" label="Кошельки">
                <button className=" button button_type_tabs">
                    Добавить
                </button>
            </FormFieldContainer>
            <FormFieldRow className=" brief-form__title"
                          label=" Пароль"
                          description=" Введите новый, если хотите изменить">
                <button className=" button button_type_tabs">
                    Изменить
                </button>
            </FormFieldRow>
        </CardHeadband>
    );
};

export default ProfileSettings;
