import React, { useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { localeUtils } from "../DatePicker/DatePicker";
import { useGetContactQuery } from "../../api/endpoints/BriefApi";
import constraints from "../../utils/constraints";
import ArticlesService from "../../services/ArticlesService";

const ContactForm = () => {
  const { data: contact, error, isLoading } = useGetContactQuery();
  const [stateFields, setStateFields] = useState({});
  const [errorFields, setErrorFields] = useState(null);

  useEffect(() => {
    setStateFields({ ...contact });
    console.log(contact);
  }, [isLoading, contact]);

  const handleChange = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;
    const { name, value } = input;
    if (!name) return;

    setStateFields({ ...stateFields, [name]: value });

    if (!isValid) {
      // setErrorFields({ ...errorFields, [name]: constraints[name].msg });
      return;
    } else {
      // setErrorFields(null);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const articlesService = new ArticlesService();
    const form_data = new FormData();
    console.log(stateFields);
    for (let key in stateFields) {
      console.log(key, stateFields[key]);
      form_data.append(key, stateFields[key]);
    }

    articlesService
      .setArticleBriefContact(form_data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFields = () =>
    fields.map((field) => (
      <TextField
        className="brief-form__input"
        label={field?.label}
        key={field?.name}
      >
        <input
          type={field?.type || "text"}
          name={field?.name}
          placeholder={field?.label}
          value={stateFields?.[field?.name] || ""}
          onChange={(e) => handleChange(e)}
          required
        />
      </TextField>
    ));

  if (isLoading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;
  return (
    <form className="brief-form" noValidate onSubmit={handleSubmit}>
      {getFields()}
      <button className="button button_type_main" type="submit">
        Send
      </button>
    </form>
  );
};

const fields = [
  {
    name: "academicStatus",
    label: "Академический статус",
  },

  {
    name: "post",
    label: "Должность",
  },

  {
    name: "birthday",
    label: "Дата рождения",
  },

  {
    name: "passportSerialNumber",
    label: "Серия и номер паспорта",
  },

  {
    name: "passportRegistration",
    label: "Прописка",
  },

  {
    name: "passportDepartmentCode",
    label: "Код подразделения",
  },

  {
    name: "passportWhoIssued",
    label: "Кем выдан паспорт",
  },

  {
    name: "passportWhenIssued",
    label: "Когда выдан паспорт",
  },

  {
    type: "file",
    name: "BriefContact[file][]",
    label: "Загрузить скан паспорта",
  },
];

export default ContactForm;
