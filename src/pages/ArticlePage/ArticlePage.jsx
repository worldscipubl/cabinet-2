import React from "react";
import MainContent from "../../components/MainContent/MainContent";
import ArticlePipeline from "../ArticlePipeline/ArticlePipeline";
import { useParams } from "react-router-dom";
import MyArticles from "../MyArticles/MyArticles";

const ArticlePage = () => {
  const { articleId } = useParams();
  const articleTabs = [
    <ArticlePipeline
      tabId="tab-1"
      tabLabel="Процесс публикации"
      articleId={articleId}
    />,
    <h2 tabId="tab-2" tabLabel="tab-2">
      Tab №2
    </h2>,
    <h2 tabId="tab-3" tabLabel="tab-3">
      Tab №3
    </h2>,
    <h2 tabId="tab-4" tabLabel="tab-4">
      Tab №4
    </h2>,
  ];

  return (
    <MainContent title={getTitle(articleId)}>
      {!articleId ? <MyArticles /> : articleTabs}
    </MainContent>
  );
};

const getTitle = (articleId) => {
  if (!articleId) return "Мои статьи";
  return "Статья №" + articleId;
};
export default ArticlePage;
