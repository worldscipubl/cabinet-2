import React, {useEffect} from "react";
import ListArticles from "../../components/ListArticles";
import ListUploads from "../../components/ListUploads";
import withMainLayout from "../../hoc/withMainLayout";
import { useGetArticlesQuery } from "../../api/endpoints/ArticlesApi";
import { useGetApplicationsQuery } from "../../api/endpoints/BeforeArticleApi";
import "./MyArticles.scss";
import {useHistory} from "react-router-dom";

const MyArticles = () => {

  const history = useHistory();

  useEffect( () => {
    history.push(`/articles`)
  },[])

  // const { data: dataArticles, error, isLoading } = useGetArticlesQuery();
  // const { data: dataUploads } = useGetApplicationsQuery();

  return (
    <>
      <ListArticles />
      {/*<ListUploads />*/}
    </>
  );
};

export default withMainLayout(MyArticles, {
  title: "Мои статьи",
  description:
    "Выберите карточку статьи или подайте заявку на новую публикацию",
});
