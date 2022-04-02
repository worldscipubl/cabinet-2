import React from "react";
import ListArticles from "../../components/ListArticles";
import ListUploads from "../../components/ListUploads";
import withMainLayout from "../../hoc/withMainLayout";
import { useGetArticlesQuery } from "../../api/endpoints/ArticlesApi";
import { useGetApplicationsQuery } from "../../api/endpoints/BeforeArticleApi";
import "./MyArticles.scss";

const MyArticles = () => {
  const { data: dataArticles, error, isLoading } = useGetArticlesQuery();
  const { data: dataUploads } = useGetApplicationsQuery();

  return (
    <>
      <ListArticles data={dataArticles} error={error} isLoading={isLoading} />
      <ListUploads data={dataUploads} />
    </>
  );
};

export default withMainLayout(MyArticles, {
  title: "Мои статьи",
  description:
    "Выберите карточку статьи или подайте заявку на новую публикацию",
});
