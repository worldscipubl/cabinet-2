import React from "react";
import ArticlesService from "../../../services/ArticlesService";
import Spoiler from "../../Spoiler/Spoiler";
import List from "../../List/List";
import ListItem from "../../List/ListItem/ListItem";
import uploadImg from "../../../common/images/icons/upload.svg";

const FileUploadSpoiler = ({ filesUpload }) => {
  const articlesService = new ArticlesService();
  const fileUploader = (data) => {
    articlesService
      .uploadFile(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Spoiler title="Загрузить документы">
      <p className="text text_color_gray card-status__desc-spoiler">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
        architecto, aspernatur cumque cupiditate dicta ea exercitationem ipsa
        iste molestias non numquam obcaecati possimus quia reiciendis ullam. Ad
        at delectus tempore.
      </p>
      <List>
        {filesUpload.map(({ typeId, typeName }) => (
          <ListItem
            key={typeName + Math.random()}
            startIcon={uploadImg}
            title={typeName || "Безымянный файл"}
            hint="Загрузить файл"
            fileUpload={(file) => {
              const formData = new FormData();
              formData.append("articleId", typeId);
              formData.append("type", 1);
              formData.append("ArticleFile[file]", file);

              fileUploader(formData);
            }}
          />
        ))}
      </List>
    </Spoiler>
  );
};

export default FileUploadSpoiler;
