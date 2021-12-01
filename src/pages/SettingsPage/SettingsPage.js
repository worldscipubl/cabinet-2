import React, { useEffect } from "react";
import Card from "../../components/Card";
import classNames from "classnames";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import styles from "./SettingsPage.module.scss";
import { useGetUserDataQuery, useSetUserDataMutation } from "../../api/endpoints/UserApi";

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

const fieldsContract = [
  {
    name: "passportSerialNumber",
    label: "Серия номер паспорта",
    placeholder: "Укажите серию и номер паспорта"
  },
  {
    name: "passportWhoIssued",
    label: "Кем выдан паспорт:",
    placeholder: "Укажите кем выдан паспорт"
  },
  {
    name: "passportDepartmentCode",
    label: "Паспорт. Код подразделения",
    placeholder: "Укажите код подразделения"
  },
  {
    name: "passportRegistration",
    label: "Паспорт. Прописка",
    placeholder: "Укажите прописку"
  },
  {
    name: "passportWhenIssued",
    label: "Когда выдан паспорт",
    placeholder: "Укажите когда выдан паспорт"
  },
  {
    name: "UserFile[file][]",
    type: "file",
    label: "Загрузить скан паспорта",
    placeholder: "Скан паспорта",
    description: "страница с фотографией и страница с пропиской"
  }
];

const SettingsPage = () => {
  const { data, error, isLoading } = useGetUserDataQuery();
  const [mutation, { error: errorSubmit } = {}] = useSetUserDataMutation();

  const handleFieldSubmit = async (nameField, valueField) => {
    if (!valueField) return;

    console.log(nameField, valueField);

    const data = { [nameField]: valueField };
    return await mutation({ data }).unwrap();
  };

  const handleFieldFileSubmit = async (data) => {
    if (!data) return;
    return await mutation({ data, isFile: true }).unwrap();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Card appearance={{ type: "paper" }}>
      <h3 className={classNames(styles.settings__subtitle, "text text_weight_bold text_size_subtitle", {})}>Данные
        профиля:</h3>
      <div className={classNames(styles.settings__form, {})}>
        {fieldsProfile.map((field) => (
          <FormField
            className={classNames(styles.settings__input, {})}
            name={field?.name}
            key={field?.name}
            label={field?.label}
            description={field?.description}
            defaultValue={data?.[field?.name]}
            propsInput={{
              type: field?.type || "text",
              placeholder: field?.placeholder,
              required: true,
              multiple: !!(field?.type === "file")
            }}
            component={<Input />}
            handlers={{ handleFieldSubmit }}
          />
        ))}
      </div>

      <h3 className="text text_weight_bold text_size_subtitle">Данные для договора:</h3>
      <div className={classNames("brief-form", {})}>
        {fieldsContract.map((field) => (
          <FormField
            className="brief-form__input"
            name={field?.name}
            key={field?.name}
            label={field?.label}
            description={field?.description}
            defaultValue={data?.[field?.name]}
            propsInput={{
              type: field?.type || "text",
              placeholder: field?.placeholder,
              required: true,
              multiple: !!(field?.type === "file")
            }}
            component={<Input />}
            handlers={{ handleFieldSubmit, handleFieldFileSubmit }}
          />
        ))}
      </div>
    </Card>
  );
};

export default SettingsPage;
