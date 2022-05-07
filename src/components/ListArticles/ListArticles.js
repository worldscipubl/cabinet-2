import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import EmptyState from "../../domain/EmptyState";
import ArticleCard from "../ArticleCard";
import imgPlus from "../../common/images/icons/plus.svg";
import {Link} from "react-router-dom";
import styles from './ListArticles.module.scss'

const ListArticles = ({ data, error, isLoading, spinner }) => {

  if (isLoading) return spinner
    ?
      <Spinner />
    :
      <>
        <div className={styles.article__message}>
          <p className="text text_size_default text_weight_bold text_align_center">Подождите... Идет получение статей</p>
        </div>
        <SkeletonArticles />
      </>

  if (error)
      return (
        <EmptyState
          type="warning"
          title="Упс... Произошла ошибка!"
          description={error.message}
      />
     );

  if (!data?.length)
    return (
      <div className="articles">
        <NewArticleCard/>
        <div></div>
        <div></div>
      </div>
      // <EmptyState
      //   title="У вас пока нет статей"
      //   description="Тут будет отображаться список ваших статей"
      // />
    );

  return (
    <div className="articles">
      <NewArticleCard/>
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
      {[0, 1, 2].map((article, index) => (
        <ArticleCard key={index} isLoading />
      ))}
    </div>
  )
};

const NewArticleCard = () => {
  return (
    <Link className={styles.article}
          to={`/new-article`}>
      <img className={styles.article__img} src={imgPlus} alt="plus" />
      <h4 className="text text_weight_bold text_color_gray">
        Подать заявку на публикацию
      </h4>
    </Link>
  );
};

ListArticles.defaultProps = {
  data: null,
  isLoading: false,
  spinner: false,
};

ListArticles.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  spinner: PropTypes.bool,
};

export default ListArticles;
