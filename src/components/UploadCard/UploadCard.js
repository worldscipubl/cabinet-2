import React from "react";
import classNames from "classnames";
import { BASE_URL } from "../../utils/constants";
import pdfImg from "../../common/images/icons/file-pdf.svg";
import { useCancelApplicationMutation, useConfirmApplicationMutation } from "../../api/endpoints/BeforeArticleApi";
import cn from "./UploadCard.module.scss";

const UploadCard = ({ article }) => {
  const [cancelApplication, {
    error: errorCancelApplication,
    isLoading: isLoadingCancelApplication
  } = {}] = useCancelApplicationMutation();
  const [confirmApplication, {
    error: errorConfirmApplication,
    isLoading: isLoadingConfirmApplication
  } = {}] = useConfirmApplicationMutation();
  const isLoading = isLoadingCancelApplication || isLoadingConfirmApplication;
  const {
    subject,
    token,
    file,
    dateCreate
  } = article || {};

  function handleConfirm() {
    confirmApplication(token).unwrap()
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClose() {
    cancelApplication(token).unwrap()
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDownload() {
    window.open(`${BASE_URL}/before-article/download/${token}`, "_blank");
  }

  return (
    <div className={classNames(cn.Wrapper, {[cn.isLoading]: isLoading})}>
      <div className={classNames(cn.Container)}>
        {subject && <div className={classNames(cn.Item)}>
          <p className="text text_color_black">
            <span className="text_weight_bold">Тематика: </span>
            {subject}
          </p>
        </div>}
        <div className={classNames(cn.FileGroup)}>
          <img className={classNames(cn.PdfImg)} src={pdfImg} alt={subject} />
          <button className={classNames("link")} onClick={handleDownload}>
            Скачать файл
          </button>
        </div>
        <div className={classNames(cn.BtnGroup)}>
          <button className="button button_type_table" onClick={handleConfirm}>Подтвердить</button>
          <button className="button button_type_table" onClick={handleClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
