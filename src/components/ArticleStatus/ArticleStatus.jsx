import React, { useState, useEffect } from "react";
import "./ArticleStatus.scss";
import Spoiler from "../../components/Spoiler/Spoiler";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem/ListItem";
import downloadImg from "../../common/images/icons/download.svg";
import uploadImg from "../../common/images/icons/upload.svg";
import { instructions } from "../../utils/textStatic";
import ArticlesService from "../../services/ArticlesService";

const ArticleStatus = ({ status, stage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!status) return;
    setLoading(false);
  }, [status]);

  return loading ? (
    <h2 className="text">Загрузка...</h2>
  ) : (
    <div className="card-status">
      <span className="text text_color_gray">
        {status.dateCreate || "00.00.00"}
      </span>
      <div className="card-status__inner">
        <div className="card-status__header">
          <h2 className="text text_size_accent text_weight_bold text_color_white card-status__title">
            {status.statusTitle || "Заголовок отсутствует"}
          </h2>
        </div>
        <div className="card-status__body">
          {StatusDescription(status.statusDescription)}
          {StatusMessage(status.note)}
          {StatusInstruction(status.statusChangeId)}
        </div>
        <div className="card-status__footer">
          {AttachmentsSpoiler(status.files)}
          {FileUploadSpoiler(status.filesUpload)}
        </div>
      </div>
    </div>
  );
};

const AttachmentsSpoiler = (attachments) => {
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
            onClick={() => {
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
            }}
          />
        ))}
      </List>
    </Spoiler>
  );
};

const FileUploadSpoiler = (filesUpload) => {
  const articlesService = new ArticlesService();
  const fileUploader = (data) => {
    console.log("Данные для отправки");
    console.log(data);

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
            hint="Скачать файл"
            fileUpload={(file) => {
              // const sendData = {
              //   articleId: typeId,
              //   type: 1,
              //   "ArticleFile[file]": file,
              // };
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

const StatusDescription = (statusDescription) => {
  return (
    <p className="text text_size_default card-status__desc">
      {statusDescription || "Замечание отсутствует"}
    </p>
  );
};

const StatusMessage = (note) => {
  return note ? (
    <div className="card-status__msg">
      <h3 className="text text_weight_bold text_size_default">
        Комментарий от аккаунт менеджера
      </h3>
      <p className="text text_size_default card-status__desc">
        {note || "Замечание отсутствует"}
      </p>
    </div>
  ) : null;
};

const StatusInstruction = (statusId) => {
  const instruction = instructions.getInstruction(statusId);
  return instruction ? (
    <div className="card-status__msg">
      <h3 className="text text_weight_bold text_size_default">Инструкция</h3>
      <p className="text text_size_default card-status__desc">{instruction}</p>
    </div>
  ) : null;
};

export default ArticleStatus;
