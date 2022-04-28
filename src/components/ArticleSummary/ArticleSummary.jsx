import React from "react";
import "./ArticleSummary.scss";
import ProgressBar from "../ProgressBar/ProgressBar";

const ArticleSummary = ({
  article: { statusTitle, title, journal, tariff, progress } = {},
}) => {
  return (
    <div className="article-summary">
      <div className="article-summary__header">
        <h2 className="text text_size_subtitle article-summary__title">
          {title || "Название статьи не указано"}
        </h2>
      </div>
      <div className="article-summary__body">
        <div className="article-summary__info">
          <div className="article-summary__col">
            <h3
              className="text text_size_accent"
              style={{ marginBottom: "12px" }}
              // TODO: убрать закоментированое если не будет замечаний
            >
              {`${journal || ""} ${journal && tariff ? `/` : ``} ${tariff || ""}`}
              {/*{`${journal || "не указано"} / ${tariff || "не указано"}`};*/}
              {/*{`${journal} / ${tariff }`}*/}
            </h3>
            <a
              className="link link_size_accent "
              // TODO: Сделать валидную ссылку на текущий статус
              href="/#"
              style={{ marginBottom: "12px" }}
            >
              <span>Этап: </span> {statusTitle}
            </a>
          </div>
          <div className="article-summary__col">
            <p className="text text_size_large">
              {progress}
              <sup className="text_size_title">%</sup>
            </p>
          </div>
        </div>
        <ProgressBar progress={progress || 0} />
      </div>
    </div>
  );
};

export default ArticleSummary;
