import React from "react";
import Spoiler from "../../Spoiler/Spoiler";
import uploadImg from "../../../common/images/icons/upload.svg";
import List from "../../List/List";
import ListItem from "../../List";
import { useUploadFileMutation } from "../../../api/endpoints/ArticleFilesApi";

const FileUploadSpoiler = ({ filesUpload, articleId }) => {
  const [uploadFile, { data, error, isLoading }] = useUploadFileMutation();

  function fileUploader(data) {
    uploadFile(data).unwrap()
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
      <p className="text text_color_gray card-status__desc-spoiler">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
        architecto, aspernatur cumque cupiditate dicta ea exercitationem ipsa
        iste molestias non numquam obcaecati possimus quia reiciendis ullam. Ad
        at delectus tempore.
      </p>
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
