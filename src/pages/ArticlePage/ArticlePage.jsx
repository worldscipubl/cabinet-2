import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import ArticlePipeline from "./ArticlePipeline/ArticlePipeline";
import MyArticles from "./MyArticles/MyArticles";
import ArticleChat from "./ArticleChat/ArticleChat";
import ArticleBrief from "./ArticleBrief/ArticleBrief";

const ArticlePage = () => {
  const { articleId } = useParams();
  const articleTabs = [
    <ArticlePipeline
      tabId="ArticlePipeline"
      tabLabel="Процесс публикации"
      key="ArticlePipeline"
      articleId={articleId}
    />,
    <ArticleChat tabId="article-chat" key="article-chat" tabLabel="Переписка">
      Переписка
    </ArticleChat>,
    <ArticleBrief
      articleId={articleId}
      tabId="article-brief"
      key="article-brief"
      tabLabel="Договор"
    >
      Договор
    </ArticleBrief>,
    <ArticleChat tabId="tab-4" tabLabel="Оплата" key="tab-4">
      Оплата
    </ArticleChat>,
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
