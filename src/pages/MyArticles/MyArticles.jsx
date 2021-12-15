import React from "react";
import { Link, Route, useParams } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import imgPlus from "../../common/images/icons/plus.svg";
import "./MyArticles.scss";
import { useGetArticlesQuery } from "../../api/endpoints/ArticlesApi";
import Loader from "../../components/Loader";
import TabLayout from "../../layouts/TabLayout";
import Spinner from "../../components/Spinner";
import MainLayout from "../../layouts/MainLayout";

const MyArticles = () => {
  const { data: articles, error, isLoading } = useGetArticlesQuery();
  const { tabId } = useParams();

  const ArticleCard = ({ article }) => {
    const { articleId, statusTitle, title, journal, tariff, progress } =
      article;

    return (
      <Link to={`/article/${articleId}`} className="article-card">
        <div className="article-card__inner">
          <div className="article-card__row">
            <span className="text text_weight_bold text_color_gray">
              №{articleId || -1}
            </span>
          </div>
          <div className="article-card__row">
            <p className="text text_size_large">
              {progress ? Math.floor(progress) : 0}
              <sup className="text_size_title">%</sup>
            </p>
          </div>

          <div className="article-card__row">
            <ProgressBar progress={progress || 0} />
          </div>

          <div className="article-card__row">
            <p className="text text_color_black">
              {title || "Название статьи не указано"}
            </p>
          </div>
          <div className="article-card__row">
            <h3 className="text">{`${journal || "не указано"} / ${
              tariff || "не указано"
            }`}</h3>
          </div>
          <div className="article-card__row">
            <h4 className="text text_color_gray">ЭТАП:</h4>
            <h4 className="text text_color_gray">
              {statusTitle || "Этап не указан"}
            </h4>
          </div>
        </div>
      </Link>
    );
  };

  const NewArticleCard = () => {
    return (
      <div className="article-card new-article">
        <div className="article-card__inner article-card__inner_align_center">
          <img className="article-card__img" src={imgPlus} alt="plus" />
          <div className="article-card__row">
            <h4 className="text text_weight_bold text_color_gray">
              Подать заявку на публикацию
            </h4>
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isLoading) return <Spinner />;
    if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;
    if (!articles) return <h2 className="text">Пусто...</h2>;
    return <article>
      <div className="articles">
        <NewArticleCard />
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article?.articleId || "article" + Math.random()}
              article={article}
            />
          );
        })}
      </div>
    </article>;
  };

  return (
    <MainLayout title="Мои статьи">
      {getContent()}
    </MainLayout>
  );
};

export default MyArticles;
