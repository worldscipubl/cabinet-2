import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import ArticlePipeline from "./ArticlePipeline/ArticlePipeline";
import ArticleChat from "./ArticleChat/ArticleChat";
import ArticleBrief from "./ArticleBrief/ArticleBrief";
import { useGetArticleByIdQuery } from "../../api/endpoints/ArticlesApi";
import Loader from "../../components/Loader";
import ArticlePayment from "./ArticlePayment/ArticlePayment";
import ArticleRequest from "./ArticleRequest/ArticleRequest";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);


  const articleTabs = [
    <ArticleRequest tabId="article-request" tabLabel="Заявка" key="ArticlePipeline" />,
    <ArticlePipeline
      tabId="article-pipeline"
      tabLabel="Процесс публикации"
      key="ArticlePipeline"
      article={article}
    />,
    <ArticleChat tabId="article-chat" key="article-chat" tabLabel="Переписка" />,
    <ArticleBrief
      articleId={articleId}
      statusId={article?.statusId}
      tabId="article-brief"
      key="article-brief"
      tabLabel="Договор" />,
    <ArticlePayment articleId={articleId} tabId="article-payment" key="article-payment" tabLabel="Оплата" />
  ];

  const getContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
    if (!article) return <h2 className="text">Пусто...</h2>;
    if (article?.statusId < 4) return articleTabs.filter((tab) => !["article-brief", "article-payment"].includes(tab.props?.tabId));
    if (article?.statusId >= 4 && article?.statusId < 9) return articleTabs.filter((tab) => !["article-payment"].includes(tab.props?.tabId));
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
