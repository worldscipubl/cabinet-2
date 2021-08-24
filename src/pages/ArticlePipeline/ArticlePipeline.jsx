import React, { useEffect } from "react";
import "./ArticlePipeline.scss";
import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
import ArticleStages from "../../components/ArticleStages/ArticleStages";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../../store/slices/articlesSlice/articlesSliceAsync";

const ArticlePipeline = ({ articleId }) => {
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, []);

  if (loading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;
  if (!article) return <h2 className="text">Пусто...</h2>;
  return (
    <div className="article">
      <ArticleSummary article={article} />
      <ArticleStages currentStage={article.currentStage} />
    </div>
  );
};

export default ArticlePipeline;
