import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import ArticlePipeline from "./ArticlePipeline/ArticlePipeline";
import ArticleChat from "./ArticleChat/ArticleChat";
import ArticleBrief from "./ArticleBrief/ArticleBrief";
import { useGetArticleByIdQuery } from "../../api/endpoints/ArticlesApi";
import Loader from "../../components/Loader";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);

  const articleTabs = [
    <ArticlePipeline
      tabId="article-pipeline"
      tabLabel="Процесс публикации"
      key="ArticlePipeline"
      article={article}
    />,
    <ArticleChat tabId="article-chat" key="article-chat" tabLabel="Переписка">
      Переписка
    </ArticleChat>,
    <ArticleBrief
      articleId={articleId}
      statusId={article?.statusId}
      tabId="article-brief"
      key="article-brief"
      tabLabel="Договор"
    >
      Договор
    </ArticleBrief>,
    <ArticleChat tabId="tab-4" tabLabel="Оплата" key="tab-4">
      Оплата
    </ArticleChat>
  ];

  const getContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
    if (!article) return <h2 className="text">Пусто...</h2>;
    if (article?.statusId < 4) return articleTabs.filter((tab) => tab.props?.tabId !== "article-brief");
    return articleTabs;
  };

  return (
    <MainContent title={getTitle(articleId)}>
      {getContent()}
    </MainContent>
  );
};

const getTitle = (articleId) => {
  return "Статья №" + articleId;
};
export default ArticlePage;
