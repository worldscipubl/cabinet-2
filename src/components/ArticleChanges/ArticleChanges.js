import React from "react";
import ArticleStatus from "../ArticleStatus";
// import { useLazyGetArticleChangesQuery } from "../../api/endpoints/TimeLineArticleApi";
import "./ArticleChanges.scss";
import { useGetHasPayQuery } from "../../api/endpoints/ArticlePaymentApi";
import Loader from "../Loader/Loader";

const ArticleChanges = ({ article, stage, statuses, isLoading }) => {
  const { articleId } = article;


  const { data: hasPay } = useGetHasPayQuery(articleId);

  if (isLoading) return <Loader />;
  if (!statuses || !statuses.length) return null;
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
    </div>
  );
};
export default ArticleChanges;
