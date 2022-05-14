import React from "react";
import Download from '../../../../common/images/icons/download.svg'
import './ArticleArchiveList.scss'
import ApiService from "../../../../services/ApiService";

const ArticleArchiveList = ({item}) => {

  function handleDownloadBtn(fileId, typeName) {
    const apiService = new ApiService();
    apiService
      .downloadResource(`/article-files/${fileId}`, typeName)
      .then()
      .catch((err) => console.log(err));
  }

  return (
    <>
    <ul className={"archive"}>
      <li className={"archive__item"} onClick={() => handleDownloadBtn(item.fileId, item.name)}>
        <img src={Download} alt="" className={"archive__img"}/>
        <p className="text text_size_default archive__title">{item.name}</p>
      </li>
    </ul>
    </>
  );

}

export default ArticleArchiveList;
