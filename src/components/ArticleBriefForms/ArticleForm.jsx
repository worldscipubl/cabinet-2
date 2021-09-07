import React, { useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import { useGetArticleQuery } from "../../api/endpoints/BriefApi";
import ArticlesService from "../../services/ArticlesService";

const ArticleForm = ({ articleId }) => {
  const { data: article, error, isLoading } = useGetArticleQuery(articleId);
  const [stateFields, setStateFields] = useState({});
  const [errorFields, setErrorFields] = useState(null);

  useEffect(() => {
    setStateFields({ ...article });
    console.log(article);
  }, [isLoading, article]);

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
      .setArticleBriefArticle(form_data)
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
    name: "articleSubject",
    label: "Тематика статьи",
  },

  {
    name: "articleName",
    label: "Название статьи",
  },

  {
    name: "articleAuthor",
    label: "Авторы статьи",
  },

  {
    name: "universityAddress",
    label: "Адрес ВУЗа",
  },

  {
    name: "universityName",
    label: "Название ВУЗа",
  },
];

export default ArticleForm;
