import React from "react";
import EmptyState from "../EmptyState/EmptyState";

const NotFoundPage = ({history}) => {

  history.replace('/home')


  return (
    <></>
    // <EmptyState
    //   imgName="page_not_found"
    //   title="Страницы не существует"
    //   description="Страница, к которой вы пытаетесь получить доступ, не существует."
    // >
    //   <button
    //     className="button button_type_main"
    //     onClick={handlerOnClick}
    //   >
    //     Вернуться на главную
    //   </button>
    // </EmptyState>
  );
};

export default NotFoundPage;
