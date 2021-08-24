import React, { useEffect } from "react";
import "./ArticleChanges.scss";
import ArticleStatus from "../ArticleStatus/ArticleStatus";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleChanges } from "../../store/slices/articlesSlice/articlesSliceAsync";

const ArticleChanges = ({ stage }) => {
  const dispatch = useDispatch();
  const {
    article: { articleId },
    statuses,
    loading,
    error,
  } = useSelector((state) => state.articles);

  console.log(statuses[stage]);

  if (!statuses || !statuses[stage] || !statuses[stage].length) return null;
  const lastStatus = statuses[stage][statuses[stage].length - 1];
  const nextStatus = lastStatus.startNext;
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
            dispatch(fetchArticleChanges({ articleId, stage, start: 1 }));
          }}
        >
          Показать предыдущие сообщения...
        </button>
      )}

      {error && <h2 className="text">{error}</h2>}
    </div>
  );
};
export default ArticleChanges;
