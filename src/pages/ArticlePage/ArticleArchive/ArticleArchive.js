import React, {useEffect, useState} from "react";
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
import articleApiFetch from "../../../api/ApiFetch/ArticleApiFetch";
import {useGetFilesByArticleIdQuery} from "../../../api/endpoints/ArticleFilesApi";
import {useGetArticleByIdQuery} from "../../../api/endpoints/ArticlesApi";

const ArticleArchive = ({ articleId, statusId }) => {

  // const {data} = useGetFilesByArticleIdQuery(articleId)
  // const { data} = useGetArticleByIdQuery(articleId);


// console.log(data)

  useEffect(() => {
    articleApiFetch.fileArchive(articleId, localStorage.getItem("user_token"))
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
    })

  });


  return (
    <EmptyState
      title="Архив пуст"
      imgName="no_data"
      description="Тут будут фалы по статье"
    />
  )

}

export default ArticleArchive;
