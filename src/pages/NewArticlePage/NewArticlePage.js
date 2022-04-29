import React from "react";
import ArticleRequest from "../ArticlePage/ArticleRequest/ArticleRequest";
import TabLayout from "../../layouts/TabLayout";
import withMainLayout from "../../hoc/withMainLayout";

const NewArticlePage = () => {

  const tabId="article-request"

  const articleTabs = [
    <ArticleRequest
      tabId="article-request"
      tabLabel="Заполнение заявки"
      key="article-request"
    />,
  ];

  return (
    <TabLayout defaultTabs={tabId}>
      {articleTabs}
    </TabLayout>
  );
};

export default withMainLayout(
  NewArticlePage,
  { title: "name" },
  ({ ...props }) => {
    return `Заявка на новую статью`;
  }
);
