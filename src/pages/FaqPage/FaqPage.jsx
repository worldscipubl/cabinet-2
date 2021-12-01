import React, { useState } from "react";
import "./FaqPage.scss";
import Input from "../../components/Input/Input";
import FormField from "../../components/FormField";

const FaqPage = (props) => {
  const [stateField, setStateField] = useState({
    "input1": "Вася",
    "input2": "Москва",
    "input3": ""
  });

  const [errorsField, setErrorsField] = useState({});

  return <div className="bg">

    <FormField
      className="brief-form__input"
      name="input1"
      defaultValue={stateField["input1"]}
      label="Ваше имя"
      propsInput={{
        type: "text",
        placeholder: "Надо вписать ваше имя",
        required: true
      }}
      component={<Input />}
      handlers={{
        handleFieldSubmit: (data) => {
          setStateField({ ...stateField, ...data });
        }
      }}
    />

    <FormField
      className="brief-form__input"
      name="input2"
      defaultValue={stateField["input2"]}
      label="Откуда вы?"
      propsInput={{
        type: "text",
        placeholder: "Напишите ваш город",
        required: true
      }}
      component={<Input />}
      handlers={{
        handleFieldSubmit: (data) => {
          setStateField({ ...stateField, ...data });
        }
      }}
    />

    <FormField
      className="brief-form__input"
      name="input3"
      defaultValue={stateField["input3"]}
      defaultError={errorsField["input3"]}
      label="Укажите номер тел."
      propsInput={{
        type: "text",
        pattern: "[0-9]{4}",
        placeholder: "Надо вписать ваш номер",
        required: true
      }}
      component={<Input />}
      handlers={{
        handleFieldSubmit: (data) => {
          setStateField({ ...stateField, ...data });
        }
      }}
    />
  </div>;
};

export default FaqPage;
