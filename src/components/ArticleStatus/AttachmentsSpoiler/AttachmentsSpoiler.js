import React from "react";
import Spoiler from "../../Spoiler/Spoiler";
import List from "../../List/List";
import ListItem from "../../List/ListItem/ListItem";
import downloadImg from "../../../common/images/icons/download.svg";
import ApiService from "../../../services/ApiService";

const AttachmentsSpoiler = ({ attachments }) => {
  function handleDownloadBtn(fileId) {
    const apiService = new ApiService();
    apiService
      .downloadResource(`/article-files/${fileId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  console.log(attachments.length);
  return (
    <Spoiler title="Показать вложения">
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
