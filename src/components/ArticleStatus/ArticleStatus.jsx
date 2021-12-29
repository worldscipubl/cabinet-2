import React, { useState, useEffect } from "react";
import "./ArticleStatus.scss";
import Spoiler from "../../components/Spoiler/Spoiler";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem/ListItem";
import downloadImg from "../../common/images/icons/download.svg";
import uploadImg from "../../common/images/icons/upload.svg";
import { instructions } from "../../utils/textStatic";
import ArticlesService from "../../services/ArticlesService";
import AttachmentsSpoiler from "./AttachmentsSpoiler";
import FileUploadSpoiler from "./FileUploadSpoiler";
import { getDate } from "../../utils/functions";
import CardHeadband from "../CardHeadband";

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
        {getDate(status.dateCreate)}
      </span>
      <CardHeadband className="card-status__inner"
                    title={status.statusTitle}
                    subHeader={<>
                      {StatusDescription(status.statusDescription)}
                      {StatusMessage(status.note)}
                      {StatusInstruction(status.statusChangeId)}
                    </>}>
        <AttachmentsSpoiler attachments={status.files} />
        <FileUploadSpoiler filesUpload={status.filesUpload} />
      </CardHeadband>
    </div>
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
