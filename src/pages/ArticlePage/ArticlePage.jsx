import React from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import ArticlePipeline from "./ArticlePipeline/ArticlePipeline";
import ArticleChat from "./ArticleChat/ArticleChat";
import ArticleBrief from "./ArticleBrief/ArticleBrief";
import { useGetArticleByIdQuery } from "../../api/endpoints/ArticlesApi";
import Loader from "../../components/Loader";
import ArticlePayment from "./ArticlePayment/ArticlePayment";
import ArticleRequest from "./ArticleRequest/ArticleRequest";
import TabLayout from "../../layouts/TabLayout";
import MainLayout from "../../layouts/MainLayout";
import Spinner from "../../components/Spinner";
import EmptyState from "../../domain/EmptyState";

const ArticlePage = () => {
  const { articleId, tabId } = useParams();
  const history = useHistory();
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

  const Content = ({ article }) => {
    if (isLoading) return <Spinner />;

    if (error) return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error}>
        <button className="button button_type_main" onClick={() => history.push("/article")}>
          Вернуться к статьям
        </button>
      </EmptyState>
    );

    if (!article) return (
      <EmptyState
        title="Статьи не существет"
        description="Данные об этой статье отсутсвуют.">
        <button className="button button_type_main" onClick={() => history.push("/articles")}>
          Вернуться к статьям
        </button>
      </EmptyState>
    );

    const filterPages = getFilterPages(article);

    return (
      <TabLayout defaultTabs={tabId}>
        {filterPages.length ?
          articleTabs.filter((tab) => !filterPages.includes(tab.props?.tabId)) :
          articleTabs
        }
      </TabLayout>
    );
  };

  return (
    <MainLayout title={getTitle(articleId)}>
      <Content article={article} />
    </MainLayout>
  );
};

const getTitle = (articleId) => {
  return "Статья №" + articleId;
};
export default ArticlePage;
