import React from "react";
import Spoiler from "../../Spoiler/Spoiler";
import List from "../../List/List";
import ListItem from "../../List/ListItem/ListItem";
import downloadImg from "../../../common/images/icons/download.svg";
import ArticlesService from "../../../services/ArticlesService";

const AttachmentsSpoiler = ({ attachments }) => {

  function handleDownloadBtn(fileId, typeName) {
    const articlesService = new ArticlesService();
    articlesService
      .getArticleFileById(fileId)
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: response.data.type })
        );

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", typeName);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch();
  }

  return (
    <Spoiler title="Показать вложения">
      <p className="text text_color_gray card-status__desc-spoiler">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
        architecto, aspernatur cumque cupiditate dicta ea exercitationem ipsa
        iste molestias non numquam obcaecati possimus quia reiciendis ullam. Ad
        at delectus tempore.
      </p>
      <List>
        {attachments.map(({ typeName, fileId }) => (
          <ListItem
            key={typeName + Math.random()}
            startIcon={downloadImg}
            title={typeName || "Безымянный файл"}
            onClick={() => handleDownloadBtn(fileId, typeName)}
          />
        ))}
      </List>
    </Spoiler>
  );
};

export default AttachmentsSpoiler;
