import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ArticleChat from "./ArticleChat";
import ArticleBrief from "./ArticleBrief";
import ArticlePayment from "./ArticlePayment";
import ArticleRequest from "./ArticleRequest";
import TabLayout from "../../layouts/TabLayout";
import Spinner from "../../components/Spinner";
import EmptyState from "../../domain/EmptyState";
import ArticlePipeline from "./ArticlePipeline";
import withMainLayout from "../../hoc/withMainLayout";
import { useGetArticleByIdQuery } from "../../api/endpoints/ArticlesApi";

const ArticlePage = () => {
  const { articleId, tabId } = useParams();
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);
  const history = useHistory();

  const articleTabs = [
    <ArticleRequest
      tabId="article-request"
      tabLabel="Заявка"
      key="article-request"
    />,
    <ArticlePipeline
      tabId="article-pipeline"
      tabLabel="Процесс публикации"
      key="ArticlePipeline"
      article={article}
    />,
    <ArticleChat
      tabId="article-chat"
      articleId={articleId}
      key="article-chat"
      tabLabel="Переписка"
    />,
    <ArticleBrief
      articleId={articleId}
      statusId={article?.statusId}
      tabId="article-brief"
      key="article-brief"
      tabLabel="Договор"
    />,
    <ArticlePayment
      articleId={articleId}
      tabId="article-payment"
      key="article-payment"
      tabLabel="Оплата"
    />,
  ];

  const getFilterPages = ({ statusId = 0, articleUploaded = false } = {}) => {
    const filters = [];
    if (statusId < 4) filters.push("article-brief", "article-payment");
    if (statusId >= 4 && statusId < 9) filters.push("article-payment");
    if (articleUploaded) filters.push("article-request");
    return filters;
  };
  const filterPages = getFilterPages(article);

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error.message}
      >
        <button
          className="button button_type_main"
          onClick={() => history.push("/article")}
        >
          Вернуться к статьям
        </button>
      </EmptyState>
    );

  if (!article)
    return (
      <EmptyState
        title="Статьи не существет"
        description="Данные об этой статье отсутсвуют."
      >
        <button
          className="button button_type_main"
          onClick={() => history.push("/articles")}
        >
          Вернуться к статьям
        </button>
      </EmptyState>
    );

  return (
    <TabLayout defaultTabs={tabId}>
      {filterPages.length
        ? articleTabs.filter((tab) => !filterPages.includes(tab.props?.tabId))
        : articleTabs}
    </TabLayout>
  );
};

export default withMainLayout(
  ArticlePage,
  { title: "name" },
  ({ ...props }) => {
    const { articleId } = useParams();
    return `Статья № ${articleId}`;
  }
);
