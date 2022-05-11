import React, { useState } from "react";
// import Card from "../../../components/Card/Card";
// import ViewPager from "../../../components/ViewPager/ViewPager";
import "./ArticleArchive.scss";
// import {
//   useAddArticleMutation,
//   useAddContactMutation,
//   useGetArticleQuery,
//   useGetContactQuery,
// } from "../../../api/endpoints/BriefApi";
// import BriefForm from "../../../components/BriefForm/BriefForm";
// import AuthorForm from "../../../components/AuthorForm/AuthorForm";
import EmptyState from "../../../domain/EmptyState";

const ArticleArchive = ({ articleId, statusId }) => {

  return (
    <EmptyState
      title="Архив пуст"
      imgName="no_data"
      description="Тут будут фалы по статье"
    />
  )

}

export default ArticleArchive;
