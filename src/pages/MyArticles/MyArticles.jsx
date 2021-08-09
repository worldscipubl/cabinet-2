import React, { useEffect, useState } from "react";
import "./MyArticles.scss";
import ArticlesService from "../../services/ArticlesService";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import imgPlus from "../../common/images/icons/plus.svg";
import { Link } from "react-router-dom";

export const MyArticles = (props) => {
  const articlesService = new ArticlesService();
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("Загружаю");

  useEffect(() => {
    articlesService
      .getArticles()
      .then((data) => {
        setArticles(data);
        setTitle("Загружено");
      })
      .catch((error) => {
        setTitle("Ошибка");
      });
  }, []);

  const articlesTrain = [
    {
      id: 1,
      statusTitle: "ffsfds",
      title: "название статьи 1",
      journal: "telnet",
      tariff: "Q4",
      progress: 30,
    },
    {
      id: 2,
      statusTitle: "ffsfds",
      title: "название статьи 1",
      journal: "telnet",
      tariff: "Q4",
      progress: 89,
    },
    {
      id: 3,
      statusTitle: "ffsfds",
      title: "название статьи 1",
      journal: "telnet",
      tariff: "Q4",
      progress: 10,
    },
    {
      id: 4,
      statusTitle: "ffsfds",
      title: "название статьи 1",
      journal: "telnet",
      tariff: "Q4",
      progress: 3,
    },
  ];

  const ArticleCard = ({
    article: { id, statusTitle, title, journal, tariff, progress } = {},
  }) => {
    return (
      <Link to={`/article/${id}`} className="article-card">
        <div className="article-card__inner">
          <div className="article-card__row">
            <span className="text text_weight_bold text_color_gray">
              №{id || -1}
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
            <h3 className="text">
              {`${journal || "не указано"} / ${tariff || "не указано"}`}
            </h3>
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
      <header>
        <h2 className="text text_size_subtitle text_weight_bold text_color_gray-blue">
          Мои статьи
        </h2>
        <p>{title}</p>
      </header>
      <div className="articles">
        <NewArticleCard />
        {articles.map((article, index) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </div>
    </article>
  );
};
