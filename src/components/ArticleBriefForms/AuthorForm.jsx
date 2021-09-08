import React from "react";
import Tabs from "../../layouts/Tabs/Tabs";
import BriefForm from "./BriefForm";
import { useGetAuthorsQuery } from "../../api/endpoints/BriefApi";

const AuthorForm = ({ fields, articleId }) => {
  const { data, error, isLoading } = useGetAuthorsQuery(articleId);

  const handlerAddTab = ({ tabs }) => {
    const label = `Автор ${tabs.length + 1}`;
    return (
      <AuthorFormInputs
        label={label}
        id={tabs.length + 1}
        key={`BriefFormAuthors-${tabs.length + 1}`}
      />
    );
  };

  const AuthorFormInputs = ({ label, id }) => {
    return (
      <BriefForm
        key={`BriefFormAuthors-${id}`}
        useQuery={() => ({ data: data[id], error: false, isLoading: false })}
        fields={fields}
        label={label}
        id={label + id}
      />
    );
  };

  const getContent = () => {
    if (!data) return AuthorFormInputs({ label: "Автор 1", id: 1 });

    return data.map((author, index) =>
      AuthorFormInputs({ label: `Автор ${index + 1}`, id: index })
    );
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
    </div>
  );
};

export default AuthorForm;
