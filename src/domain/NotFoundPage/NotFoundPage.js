import React from "react";
import { useHistory } from "react-router-dom";
import EmptyState from "../EmptyState/EmptyState";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <EmptyState
      imgName="page_not_found"
      title="Страницы не существует"
      description="Страница, к которой вы пытаетесь получить доступ, не существует."
    >
      <button className="button button_type_main" onClick={() => history.push("/")}>
        Вернуться на главную
      </button>
    </EmptyState>
  );
};

export default NotFoundPage;
