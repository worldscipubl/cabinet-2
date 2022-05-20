import React from "react";
import classNames from "classnames";
import SectionLabel from "../SectionLabel";
import cn from "./ListUploads.module.scss";
import UploadCard from "../UploadCard";

const ListUploads = ({ data }) => {
  if (!data ) return null;

  return (
    <div className={classNames(cn.Wrapper)}>
      <SectionLabel
        className={classNames(cn.Header)}
        title="Подтверждение загрузки"
        description="Мы получили заявку на аудит статьи через сайт. Пожалуйста, подтвердите действие."
      />
      <div className="articles">
        {data.map((article) => {
          return (
            <>
            <p>тест</p>
            </>
            // <UploadCard
            //   key={article?.articleId || "article" + Math.random()}
            //   article={article}
            // />
          );
        })}
      </div>
    </div>
  );
};

export default ListUploads;
