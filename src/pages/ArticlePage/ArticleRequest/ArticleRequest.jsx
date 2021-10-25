import React from "react";
import classNames from "classnames";
import Field from "../../../components/Field/Field";
import Input from "../../../components/Input/Input";

const ArticleRequest = () => {

  const ArticleRequestForm = () => {
    return (
      <div className={classNames("brief-form", {})} key={"RegFormInputs"}>
        {fieldsArticleRequestForm.map((field) => {
          return <Field
            className="brief-form__input"
            name={field?.name}
            key={field?.name}
            label={field?.label}
            description={field?.description}
            propsInput={{
              type: field?.type || "text",
              required: true
            }}
            component={<Input />}
            // handlers={{ handleChange }}
          />;
        })}
      </div>
    );
  };

  return (
    <div>
      <ArticleRequestForm />
    </div>
  );
};

const fieldsArticleRequestForm = [
  {
    name: "name",
    label: "ФИО",
    placeholder: "Укажите ФИО"
  },

  {
    name: "post",
    label: "Должность",
    placeholder: "Укажите должность"
  },

  {
    name: "vuz_name",
    label: "Университет",
    placeholder: "Укажите университет"
  },

  {
    name: "country",
    label: "Страна",
    placeholder: "Укажите страна"
  },

  {
    name: "article_tema",
    label: "Тема",
    placeholder: "Укажите тему"
  },

  {
    name: "wishes_journal",
    label: "Пожелания",
    placeholder: "Ваши пожелания"
  },

  {
    name: "new_file_order",
    label: "Файл статьи",
    placeholder: "Загрузите статью",
    type: "file"
  }
];

export default ArticleRequest;
