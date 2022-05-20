import React, {useEffect, useState} from "react";
import "./ArticleArchive.scss";
import EmptyState from "../../../domain/EmptyState";
import articleApiFetch from "../../../api/ApiFetch/ArticleApiFetch";
import Loader from "../../../components/Loader";
import ArticleArchiveList from "./ArticleArchiveList";
import {useHistory, useParams} from "react-router-dom";

const ArticleArchive = ({ filesArchive }) => {

  const history = useHistory()
  const {articleId, tabId} = useParams()

  // const [isLoading, setIsLoading] = useState(false)
  // const [isEmpty, setIsEmpty] = useState(false)
  // const [files, setFiles] = useState([])

  useEffect(() => {
    // setIsLoading(true)
    // articleApiFetch.fileArchive(articleId, localStorage.getItem("user_token"))
    //   .then(res => {
    //     setFiles(res)
    //     !files.length < 1 && setIsEmpty(true)
    //     setIsLoading(false)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     setIsLoading(false)
    // })
    history.push(`/article/${articleId}/article-archive`)
  },[]);

  // if (isLoading) return <Loader />;
  //
  // if (files.length < 1) {
  //   return (
  //     <EmptyState
  //       title="Архив пуст"
  //       imgName="no_data"
  //       description="Тут будут файлы по статье"
  //     />
  //   )
  // }

  return (
    filesArchive.map((item, index) => (
      <ul className={"archive"}>
        <ArticleArchiveList
          key={item.dateCreate}
          item={item}
        />
      </ul>
    ))
  );

}

export default ArticleArchive;
