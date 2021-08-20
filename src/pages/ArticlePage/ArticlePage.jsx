import React, { useEffect, useState } from "react";
import "./Article.scss";
import { useParams } from "react-router-dom";
import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
import ArticleStages from "../../components/ArticleStages/ArticleStages";
import ArticlesService from "../../services/ArticlesService";

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState(null);
  const [statuses, setStatuses] = useState({});
  const articlesService = new ArticlesService();
  const getArticle = () => {
    articlesService
      .getArticleById(articleId)
      .then((article) => {
        setArticle(article);

        if (article.currentStatus)
          setStatuses({
            ...statuses,
            [article.currentStage]: article.currentStatus,
          });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getArticleChanges = (stage, start) => {
    articlesService
      .getArticleChanges(articleId, stage || 1, start)
      .then((data) => {
        setStatuses({
          ...statuses,
          [article.currentStage]: [...statuses[article.currentStage], ...data],
        });
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticle();
  }, []);

  if (loading) return <h2 className="text">Загрузка...</h2>;
  if (error) return <h2 className="text">{error}</h2>;

  return (
    <div className="article">
      <ArticleSummary article={article} />
      <ArticleStages
        currentStage={article.currentStage}
        statuses={statuses}
        getArticleChanges={getArticleChanges}
      />
    </div>
  );
};

export default ArticlePage;
