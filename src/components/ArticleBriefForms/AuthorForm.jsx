import React, { useEffect, useState } from "react";
import Tabs from "../../layouts/Tabs/Tabs";
import BriefForm from "./BriefForm";
import { useGetAuthorsQuery } from "../../api/endpoints/BriefApi";
import { articlesService } from "../../services/ArticlesService";

const AuthorForm = ({ fields, articleId }) => {
  const { data, error, isLoading } = useGetAuthorsQuery(articleId);
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});

  const getStateFields = (key, status) => {
    if (!status) return;
    if (key > authors.length) {
      setAuthors(prevAuthors => [...prevAuthors.slice(0, key), {
        ...prevAuthors[key],
        ...status
      }]);
    } else {
      setAuthors(prevAuthors => [
        ...prevAuthors.slice(0, key),
        {
          ...prevAuthors[key],
          ...status
        },
        ...prevAuthors.slice(key + 1)
      ]);
    }
  };

  const getStatusForm = (key, status) => {
    setErrors(prevErrors => ({ ...prevErrors, ...{ [key]: !!status } }));
  };

  useEffect(() => {
    if (!data) return;
    setAuthors([...data]);
  }, [isLoading, data]);

  const handlerAddTab = ({ tabs }) => {
    const label = `Автор ${tabs.length + 1}`;
    return (
      <AuthorFormInputs
        label={label}
        nameForm={tabs.length}
        id={tabs.length}
        key={`BriefFormAuthors-${tabs.length + 1}`}
      />
    );
  };

  const AuthorFormInputs = ({ label, id }) => {
    return (
      <BriefForm
        key={`BriefFormAuthors-${id}`}
        nameForm={id}
        useQuery={() => ({ data: data[id], error: false, isLoading: false })}
        getStateFields={getStateFields}
        getStatusForm={getStatusForm}
        fields={fields}
        label={label}
        isFieldSubmit={false}
      />
    );
  };

  const getContent = () => {
    if (!data) return AuthorFormInputs({ label: "Автор 1", id: 1 });

    return data.map((author, index) =>
      AuthorFormInputs({ label: `Автор ${index + 1}`, id: index })
    );
  };

  const handlerFromSubmit = () => {

    const form_data = new FormData();
    form_data.append("articleId", articleId);
    form_data.append("authorInfo", authors);

    articlesService
      .setArticleBriefAuthors(form_data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {

      });
  };

  if (isLoading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;
  return (
    <div>
      <p className="text text_size_accent text_color_gray brief-form__description">
        Мы получили Вашу статью на аудит. <br />
        Пока мы проводим работу заполните данные для публикации статьи. <br />
        Это необходимо для плодотворного сотрудничества по продвижению научной
        статьи.
      </p>
      <Tabs
        options={{
          isExtensible: true,
          tabsLimit: 5
        }}
        handlers={{ handlerAddTab }}
      >
        {getContent()}
      </Tabs>

      <button className="button button_type_main" type="button" onClick={handlerFromSubmit}>
        Send
      </button>
    </div>
  );
};

export default AuthorForm;
