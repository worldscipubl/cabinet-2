import React from 'react';
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";
import {useGetWalletsQuery} from "../../../api/endpoints/WalletsApi";
import FormFieldContainer from "../../../components/FormFieldContainer";
import List from "../../../components/List/List";
import ListItem from "../../../components/List";
import ListItemContainer from "../../../components/List/ListItemContainer";
import CardItem from "../../../components/CardList/CardItem";
import CardList from "../../../components/CardList";

const ProfileSettings = () => {
    return (
        <CardHeadband title="Настройки профиля">
            <FormFieldContainer className=" brief-form__title"
                                label="Ваши карты"
                                description="Вы можете добавить или удалить карту, привязанную к вашему профилю">
                <CardList/>
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

function LoadingList() {
    return [1, 2, 3, 4, 5].map(() => (
        <CardItem/>
    ))
}

export default ProfileSettings;
