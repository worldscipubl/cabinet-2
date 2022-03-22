import React, { useState, useEffect } from "react";
import { instructions } from "../../utils/textStatic";
import { buttons } from "../../utils/textStatic";
import AttachmentsSpoiler from "./AttachmentsSpoiler";
import FileUploadSpoiler from "./FileUploadSpoiler";
import { getDate } from "../../utils/functions";
import CardHeadband from "../CardHeadband";
import "./ArticleStatus.scss";
import Spinner from "../Spinner";
import { useUpdateStatusArticleMutation } from "../../api/endpoints/ArticlesApi";

const ArticleStatus = ({ status, articleId, article, hasPay }) => {
  const [loading, setLoading] = useState(true);
  const [updateStatusArticle, {}] = useUpdateStatusArticleMutation();

  useEffect(() => {
    if (!status) return;
    setLoading(false);
  }, [status]);

  if (loading) return <Spinner />;

  return (
    <div className="card-status">
      <span className="text text_color_gray">{getDate(status.dateCreate)}</span>
      <CardHeadband
        className="card-status__inner"
        title={status.statusTitle}
        subHeader={
          <>
            {StatusDescription(status.statusDescription)}
            {StatusMessage(status.note)}
            {StatusInstruction(status.statusChangeId)}
            {StatusButtons(
              status.statusChangeId,
              articleId,
              article,
              hasPay,
              updateStatusArticle
            )}
          </>
        }
      >
        {" "}
        {status.files.length > 0 ? (
          <AttachmentsSpoiler attachments={status.files} />
        ) : null}
        {status.filesUpload.length > 0 ? (
          <FileUploadSpoiler
            filesUpload={status.filesUpload}
            articleId={articleId}
          />
        ) : null}
      </CardHeadband>
    </div>
  );
};

const StatusDescription = (statusDescription) => {
  return (
    <p className="text text_size_default card-status__desc">
      {statusDescription || "Описание отсутствует"}
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
      {instruction.map((item, index) => {
        return (
          <p className="text text_size_default card-status__desc">
            {index + 1}) {item}
          </p>
        );
      })}
    </div>
  ) : null;
};

const StatusButtons = (
  statusId,
  articleId,
  article,
  hasPay,
  updateStatusArticle
) => {
  const button = buttons.getButton(statusId);
  return button ? (
    <div className="card-status__msg">
      {button.map((item) => {
        if (item.active({ hasPay: hasPay })) {
          return (
            <button
              className={item.class}
              type="submit"
              onClick={() =>
                item.action({
                  articleId: articleId,
                  article: article,
                  updateStatusArticle: updateStatusArticle,
                })
              }
            >
              {item.text}
            </button>
          );
        }
      })}
    </div>
  ) : null;
};

export default ArticleStatus;
