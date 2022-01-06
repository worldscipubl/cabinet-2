import React from 'react';
import {useHistory} from "react-router-dom";
import classNames from "classnames";
import styles from "../SettingsPage.module.scss";
import FormField from "../../../components/FormField";
import Input from "../../../components/Input";
import {useGetUserDataQuery, useSetUserDataMutation} from "../../../api/endpoints/UserApi";
import CardHeadband from "../../../components/CardHeadband";
import EmptyState from "../../../domain/EmptyState";

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
        <CardHeadband title="Данные профиля:">
            <div className={classNames(styles.settings__form, {})}>
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
        </CardHeadband>
    );
};

export default ProfileData;
