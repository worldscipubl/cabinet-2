import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ListArticles from "../../components/ListArticles";
import ListUploads from "../../components/ListUploads";
import { useGetArticlesQuery } from "../../api/endpoints/ArticlesApi";
import { useGetApplicationsQuery } from "../../api/endpoints/BeforeArticleApi";
import "./MyArticles.scss";


const MyArticles = () => {
  const { data: dataArticles, error, isLoading } = useGetArticlesQuery();
  const { data: dataUploads } = useGetApplicationsQuery();

  return (
    <MainLayout title="Мои статьи"
                description="Выберите карточку статьи или подайте заявку на новую публикацию">
      <ListArticles data={dataArticles} error={error} isLoading={isLoading} />
      <ListUploads data={dataUploads} />
    </MainLayout>
  );
};

export default MyArticles;
