import React, { useEffect, useState } from "react";
import "./ArticleChanges.scss";
import { useLazyGetArticleChangesQuery } from "../../api/endpoints/ArticlesApi";
import ArticleStatus from "../ArticleStatus/ArticleStatus";

const ArticleChanges = ({ article }) => {
  const { currentStage: stage, articleId } = article;
  const [statuses, setStatuses] = useState(article?.currentStatus || []);
  const [trigger, { data: updateStatuses, error, isLoading, isError }] =
    useLazyGetArticleChangesQuery();

  useEffect(() => {
    if (!updateStatuses) return;
    setStatuses((prev) => [...prev, ...updateStatuses]);
  }, [updateStatuses]);

  const getMore = (nextStatus) => {
    trigger({
      articleId,
      stage,
      start: nextStatus
    });
  };

  if (!statuses || !statuses.length) return null;
  const lastStatus = statuses[statuses.length - 1];
  const nextStatus = lastStatus?.startNext;
  return (
    <div className="article-changes">
      {statuses.map((status) => {
        return (
          <ArticleStatus
            key={stage + status.statusChangeId + Math.random()}
            status={status}
            stage={stage}
          />
        );
      })}
      {nextStatus && !isLoading && (
        <button
          className="text text_size_default text_color_gray article-changes__old-msg"
          onClick={() => {
            getMore(nextStatus);
          }}
        >
          Показать предыдущие сообщения...
        </button>
      )}

      {isLoading && (
        <h2 className="text text_size_default text_color_gray article-changes__old-msg">
          Загружаю...
        </h2>
      )}
      {isError && (
        <h2 className="text text_size_default text_color_red article-changes__old-msg">
          {error}
        </h2>
      )}
    </div>
  );
};
export default ArticleChanges;
