import React, { useEffect, useState } from "react";
import ArticleStatus from "../ArticleStatus";
import { useLazyGetArticleChangesQuery } from "../../api/endpoints/TimeLineArticleApi";
import "./ArticleChanges.scss";
import {useGetHasPayQuery} from "../../api/endpoints/ArticlePaymentApi";

const ArticleChanges = ({ article }) => {
  const { currentStage: stage, articleId } = article;
  const [statuses, setStatuses] = useState(article?.currentStatus || []);
  const [trigger, { data: updateStatuses, error, isLoading, isError }] =
    useLazyGetArticleChangesQuery();

  const {data: hasPay} = useGetHasPayQuery(articleId);

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
            articleId={articleId}
            article={article}
            hasPay={hasPay}
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
