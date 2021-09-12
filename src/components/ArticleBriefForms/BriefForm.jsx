import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { articlesService } from "../../services/ArticlesService";
import Input from "../Input/Input";
import FormField from "../FormField/FormField";

const BriefForm = ({
                     nameForm,
                     useQuery,
                     useQueryParams,
                     fields = [],
                     articleId,
                     getStatusForm,
                     getStateFields,
                     isFieldSubmit = true
                   }) => {
  const { data, error, isLoading } = useQuery(useQueryParams);
  const [stateFields, setStateFields] = useState({});
  const [errorFields, setErrorFields] = useState({});
  const [requiredErrors, setRequiredErrors] = useState([]);
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    if (!data) return;
    setStateFields({ ...data });
  }, [isLoading, data]);

  useEffect(() => {
    if (!stateFields) return;

    const res = fields.map((item) => {
      const name = item?.name;
      const value = stateFields?.[name];

      if (name === "email") {
        if (!value) {
          console.log("email - error", value);
          console.log(stateFields);
        }
      }

      !value && setRequiredErrors([...[requiredErrors], name]);
      return !!value;
    });

    const status = res.every((item) => !!item);
    !!getStatusForm && getStatusForm(nameForm, status);
    !!getStateFields && getStateFields(nameForm, stateFields);

  }, [stateFields]);

  const handleFieldChange = (e) => {
    const input = e.target;
    if (!input) return;

    const { name, value } = input;
    if (!name) return;

    if (!input.validity.valid) {
      // setErrorFields({ ...errorFields, [name]: constraints[name].msg });
    } else {
      setErrorFields(null);
    }
    const file = input?.files && input?.files[0];

    const valueField = { [name]: file || value };
    !isFieldSubmit && setStateFields({ ...stateFields, ...valueField });

    return data;
  };

  const handleFieldSubmit = (nameField, valueField) => {
    // TODO: сделать отправку данных на сервре и только после успешного о
    if (!valueField) return;

    // setUpdating(true);
    const form_data = new FormData();
    form_data.append(nameField, valueField);
    form_data.append("articleId", articleId);

    return new Promise((resolve, reject) => {
      articlesService
        .setArticleBriefArticle(form_data)
        .then((response) => {
          setStateFields({ ...stateFields, ...{ [nameField]: valueField } });
          resolve(true);
        })
        .catch((error) => {
          setErrorFields({ ...errorFields, ...{ [nameField]: error?.message || "Ошибка при отправке данных." } });
          reject(false);
        })
        .finally(() => {
          // setUpdating(false);
        });
    });
  };


  if (isLoading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;

  return (
    <form
      className={classNames("brief-form", {
        disabled: isUpdating
      })}
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
      noValidate
    >
      {fields.map((field) => (
        <FormField
          className="brief-form__input"
          name={field?.name}
          key={field?.name}
          defaultValue={stateFields[field?.name]}
          defaultError={errorFields[field?.name]}
          label={field?.label}
          description={field?.description}
          propsInput={{
            type: field?.type || "text",
            placeholder: stateFields?.[field?.name] || (requiredErrors.includes(field?.name)
              ? `Укажите ${field?.label?.toLowerCase()}`
              : field?.label?.toLowerCase())
            ,
            required: true
          }}
          component={<Input />}
          handlers={{ handleFieldSubmit }}
        />
      ))}
    </form>
  );
};

export default BriefForm;
