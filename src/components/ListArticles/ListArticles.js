import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import EmptyState from "../../domain/EmptyState";
import ArticleCard from "../ArticleCard";
import imgPlus from "../../common/images/icons/plus.svg";

const ListArticles = ({ data, error, isLoading, spinner }) => {
  if (isLoading) return spinner ? <Spinner /> : <SkeletonArticles />;

  if (error) return (
    <EmptyState
      fullScreen={true}
      type="warning"
      title="Упс... Произошла ошибка!"
      description={error} />
  );

  if (!data?.length) return (
    <EmptyState
      title="У вас пока нет статей"
      description="Тут будет отображаться список ваших статей" />
  );

  return (
    <div className="articles">
      {data.map((article) => {
        return (
          <ArticleCard
            key={article?.articleId || "article" + Math.random()}
            article={article}
          />
        );
      })}
    </div>
  );
};

const SkeletonArticles = () => {
  return (
    <div className="articles">
      {[0, 1, 2].map((article, index) => <ArticleCard key={index} isLoading />)}
    </div>
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

ListArticles.defaultProps = {
  data: null,
  error: "",
  isLoading: false,
  spinner: false
};

ListArticles.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  spinner: PropTypes.bool
};

export default ListArticles;
