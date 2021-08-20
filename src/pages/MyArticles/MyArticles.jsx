import React, { useEffect, useState } from "react";
import "./MyArticles.scss";
import ArticlesService from "../../services/ArticlesService";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import imgPlus from "../../common/images/icons/plus.svg";
import { Link } from "react-router-dom";

export const MyArticles = () => {
  const articlesService = new ArticlesService();
  const [articles, setArticles] = useState([]);
  // TODO: Добавить индикатор загрузки статей

  useEffect(() => {
    articlesService
      .getArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        //  TODO: Добавить обработчк ошибок при загрузки статей
        //     (это может быть либое тостер, либо экран заглушка)
        console.log(error.message);
      });
  }, []);

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

  return (
    <article>
      <div className="articles">
        <NewArticleCard />
        {articles.map((article) => {
          return (
            <ArticleCard key={"article.id" + Math.random()} article={article} />
          );
        })}
      </div>
    </article>
  );
};
