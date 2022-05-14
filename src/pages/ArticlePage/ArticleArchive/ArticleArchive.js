import React, {useEffect, useState} from "react";
import "./ArticleArchive.scss";
import EmptyState from "../../../domain/EmptyState";
import articleApiFetch from "../../../api/ApiFetch/ArticleApiFetch";
import Loader from "../../../components/Loader";
import ArticleArchiveList from "./ArticleArchiveList";

const ArticleArchive = ({ articleId }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [files, setFiles] = useState([])

  useEffect(() => {
    setIsLoading(true)
    articleApiFetch.fileArchive(articleId, localStorage.getItem("user_token"))
      .then(res => {
        console.log(res)
        setFiles(res)
        !files.length < 1 && setIsEmpty(true)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
    })
  },[]);

  if (isLoading) return <Loader />;

  if (files.length < 1) {
    return (
      <EmptyState
        title="Архив пуст"
        imgName="no_data"
        description="Тут будут файлы по статье"
      />
    )
  }

  return (
    files.map((item, index) => (
      <ArticleArchiveList
        key={item.dateCreate}
        item={item}
      />
    ))
  );

}

export default ArticleArchive;
