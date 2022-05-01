import React from "react";
import Spoiler from "../../Spoiler/Spoiler";
import List from "../../List/List";
import ListItem from "../../List/ListItem/ListItem";
import downloadImg from "../../../common/images/icons/download.svg";
import ApiService from "../../../services/ApiService";

const AttachmentsSpoiler = ({ attachments }) => {

  function handleDownloadBtn(fileId, typeName) {

    const apiService = new ApiService();
    apiService
      .downloadResource(`/article-files/${fileId}`, typeName)
      .then((res) => console.log("RES", res))

      .catch((err) => console.log(err));
  }

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
