import React, { useEffect } from "react";
import "./ArticlePipeline.scss";
import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
import ArticleStages from "../../components/ArticleStages/ArticleStages";
import { useGetArticleByIdQuery } from "../../api/endpoints/ArticlesApi";

const ArticlePipeline = ({ articleId }) => {
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);

  if (isLoading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;
  if (!article) return <h2 className="text">Пусто...</h2>;
  return (
    <div className="article">
      <ArticleSummary article={article} />
      <ArticleStages article={article} />
    </div>
  );
};

export default ArticlePipeline;
