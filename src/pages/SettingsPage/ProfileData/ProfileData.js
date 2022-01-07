import React from 'react';
import classNames from "classnames";
import FormField from "../../../components/FormField";
import Input from "../../../components/Input";
import CardHeadband from "../../../components/CardHeadband";
import EmptyState from "../../../domain/EmptyState";
import FieldAvatar from "../../../components/FieldAvatar";
import {useGetUserDataQuery, useSetUserDataMutation} from "../../../api/endpoints/UserApi";
import styles from "../SettingsPage.module.scss";

const fieldsProfile = [
    {
        name: "name",
        label: "ФИО",
        placeholder: "Укажите ФИО"
    },
    {
        name: "birthday",
        label: "Дата рождения",
        placeholder: "Укажите дату рождения"
    },
    {
        // don't have
        name: "phone",
        label: "Номер телефона",
        placeholder: "Укажите ваш телефон"
    },
    {
        name: "academicStatus",
        label: "Академический статус: ",
        placeholder: "Укажите академический статус"
    },
    {
        name: "post",
        label: "Должность",
        placeholder: "Укажите должность"
    },
    {
        // don't have
        name: "country",
        label: "Страна",
        placeholder: "Укажите вашу страну"
    }
];

const ProfileData = () => {
    const {data, error, isLoading} = useGetUserDataQuery();
    const [mutation, {error: errorSubmit} = {}] = useSetUserDataMutation();

    const handleFieldSubmit = async (nameField, valueField) => {
        if (!valueField) return;

        const data = {[nameField]: valueField};
        return await mutation({data}).unwrap();
    };

    if (error) return (
        <EmptyState
            type="warning"
            title="Упс... Произошла ошибка!"
            description={error}>
            <button className="button button_type_main" onClick={() => document.location.reload()}>
                Обновить страницу
            </button>
        </EmptyState>
    );

    return (
        <CardHeadband title="Данные профиля">
            <div className={classNames(styles.settings__avatarGroup)}>
                <FieldAvatar className={classNames(styles.settings__avatar)}/>
                <div className={classNames(styles.settings__avatarForm, {})}>
                    {fieldsProfile.map((field) => (
                        <FormField
                            className={classNames(styles.settings__input, {})}
                            name={field?.name}
                            key={field?.name}
                            label={field?.label}
                            isLoading={isLoading}
                            description={field?.description}
                            defaultValue={data?.[field?.name]}
                            propsInput={{
                                type: field?.type || "text",
                                placeholder: field?.placeholder,
                                required: true,
                                multiple: !!(field?.type === "file")
                            }}
                            component={<Input/>}
                            handlers={{handleFieldSubmit}}
                        />
                    ))}
                </div>
            </div>
        </CardHeadband>
    );
};

export default ProfileData;
