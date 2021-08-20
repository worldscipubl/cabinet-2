import React from "react";
import "./ArticleChanges.scss";
import ArticleStatus from "../../ArticleStatus/ArticleStatus";

const ArticleChanges = ({ statuses, stage, getArticleChanges }) => {
  if (!statuses || !statuses[stage] || !statuses[stage].length) return null;
  const lastStatus = statuses[stage][statuses[stage].length - 1];
  const nextStatus = lastStatus.urlNext;
  return (
    <div className="article-changes">
      {statuses[stage].map((status) => {
        return (
          <ArticleStatus
            key={stage + status.statusChangeId + Math.random()}
            status={status}
            stage={stage}
          />
        );
      })}
      {nextStatus && (
        <button
          className="text text_size_default text_color_gray article-changes__old-msg"
          onClick={() => {
            getArticleChanges(stage, 1);
          }}
        >
          Показать предыдущие сообщения...
        </button>
      )}
    </div>
  );
};
export default ArticleChanges;
