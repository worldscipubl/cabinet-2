import React, { useEffect, useState } from "react";
import { articlesService } from "../../services/ArticlesService";
import TextFieldEditable from "../TextField/TextFieldEditable";
import Input from "../Input/Input";

const BriefForm = ({ useQuery, useQueryParams, fields = [], articleId }) => {
  const { data, error, isLoading } = useQuery(useQueryParams);
  const [stateFields, setStateFields] = useState({});
  const [errorFields, setErrorFields] = useState(null);

  useEffect(() => {
    setStateFields({ ...data });
  }, [isLoading, data]);

  const handleChange = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;
    const { name, value } = input;
    if (!name) return;

    if (!isValid) {
      // setErrorFields({ ...errorFields, [name]: constraints[name].msg });
    } else {
      setErrorFields(null);
    }
    const file = input?.files && input?.files[0];
    return { [name]: file || value };
  };

  const handleFieldSubmit = (valueField) => {
    // TODO: сделать отправку данных на сервре и только после успешного о
    if (!valueField) return;
    setStateFields({ ...stateFields, ...valueField });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    for (let key in stateFields) form_data.append(key, stateFields[key]);
    form_data.append("articleId", articleId);

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
      <TextFieldEditable
        className="brief-form__input"
        label={field?.label}
        description={field?.description}
        key={field?.name}
        handlers={{ handleChange, handleFieldSubmit }}
        error={!!(errorFields && errorFields?.[field?.name])}
      >
        <Input
          type={field?.type || "text"}
          name={field?.name}
          placeholder={field?.label}
          value={stateFields?.[field?.name] || ""}
          required
        />
      </TextFieldEditable>
    ));

  if (isLoading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;

  return (
    <form
      className="brief-form"
      noValidate
      onSubmit={handleSubmit}
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      {getFields()}
      <button className="button button_type_main" type="submit">
        Send
      </button>
    </form>
  );
};

export default BriefForm;
