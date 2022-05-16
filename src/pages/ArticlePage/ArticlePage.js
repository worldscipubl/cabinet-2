import React, {useEffect, useState} from "react";
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
import ArticleArchive from "./ArticleArchive";
import articleApiFetch from "../../api/ApiFetch/ArticleApiFetch";

const ArticlePage = () => {

  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] =useState(false)
  const [error, setError] =useState(false)
  const [currentStage, setCurrentStage] =useState(false)

  const { articleId, tabId } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true)
    articleApiFetch.articleStatus(articleId, localStorage.getItem('user_token'),"articleUploaded,currentStage,currentStatus")
      .then(res => {
        setArticle(res)
        setIsLoading(false)
        setError(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setError(true)
      })
  }, []);



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
      currentStage={currentStage}
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
    <ArticleArchive
      articleId={articleId}
      tabId="article-archive"
      key="article-archive"
      tabLabel="Архив"
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

  // return (
  //   <>
  //   <p>1111111111111</p>
  //   </>
  // )

};

// export default ArticlePage




export default withMainLayout(
  ArticlePage,
  { title: "" },
  ({ tabId }) => {
    const { articleId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const { data: article } = useGetArticleByIdQuery(articleId);

    useEffect(() => {
      article ? setIsLoading(false) : setIsLoading(true)
    }, [article])

    if (!isLoading) {
      return `№${articleId} ${article.contractNumber ? `(${article.contractNumber})` : ``}`
    } else {
    }
  }
);
