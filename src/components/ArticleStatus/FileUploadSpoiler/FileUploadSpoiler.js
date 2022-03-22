import React from "react";
import Spoiler from "../../Spoiler/Spoiler";
import uploadImg from "../../../common/images/icons/upload.svg";
import List from "../../List/List";
import ListItem from "../../List";
import { useUploadFileMutation } from "../../../api/endpoints/ArticleFilesApi";

const FileUploadSpoiler = ({ filesUpload, articleId }) => {
  const [uploadFile, { data, error, isLoading }] = useUploadFileMutation();

  function fileUploader(data) {
    uploadFile(data)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function submitFile(file, fileArticleTypeId) {
    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("typeId", fileArticleTypeId);
    formData.append("ArticleFile[file]", file);

    fileUploader(formData);
  }

  return (
    <Spoiler title="Загрузить документы">
      <List>
        {filesUpload.map(({ fileArticleTypeId, typeName }) => (
          <ListItem
            key={`${typeName}-${fileArticleTypeId}`}
            startIcon={uploadImg}
            title={typeName || "Безымянный файл"}
            hint="Загрузить файл"
            disabled={isLoading}
            fileUpload={(file) => submitFile(file, fileArticleTypeId)}
          />
        ))}
      </List>
    </Spoiler>
  );
};

export default FileUploadSpoiler;
