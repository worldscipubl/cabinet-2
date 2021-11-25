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
    <ArticleRequest tabId="article-request" tabLabel="Заявка" key="article-request" />,
    <ArticlePipeline
      tabId="article-pipeline"
      tabLabel="Процесс публикации"
      key="ArticlePipeline"
      article={article}
    />,
    <ArticleChat tabId="article-chat" articleId={articleId} key="article-chat" tabLabel="Переписка" />,
    <ArticleBrief
      articleId={articleId}
      statusId={article?.statusId}
      tabId="article-brief"
      key="article-brief"
      tabLabel="Договор" />,
    <ArticlePayment articleId={articleId} tabId="article-payment" key="article-payment" tabLabel="Оплата" />
  ];

  const getFilterPages = ({ statusId = 0, articleUploaded = false } = {}) => {
    const filters = [];
    if (statusId < 4) filters.push("article-brief", "article-payment");
    if (statusId >= 4 && statusId < 9) filters.push("article-payment");
    if (articleUploaded) filters.push("article-request");
    return filters;
  };

  const getContent = (article) => {
    if (isLoading) return <Loader />;
    if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
    if (!article) return <h2 className="text">Пусто...</h2>;
    const filterPages = getFilterPages(article);
    if (filterPages.length) return articleTabs.filter((tab) => !filterPages.includes(tab.props?.tabId));
    return articleTabs;
  };

  return (
    <MainContent title={getTitle(articleId)}>
      {getContent(article)}
    </MainContent>
  );
};

const getTitle = (articleId) => {
  return "Статья №" + articleId;
};
export default ArticlePage;
