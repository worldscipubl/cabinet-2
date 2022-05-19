import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import EmptyState from "../../domain/EmptyState";
import ArticleCard from "../ArticleCard";
import imgPlus from "../../common/images/icons/plus.svg";
import {Link} from "react-router-dom";
import styles from './ListArticles.module.scss'
import ArticleApiFetch from "../../api/ApiFetch/ArticleApiFetch";
import classNames from "classnames";
import cn from "../../layouts/TabLayout/TabButton/TabButton.module.scss";
import ListUploads from "../ListUploads";
import {useGetApplicationsQuery} from "../../api/endpoints/BeforeArticleApi";
import Loader from "../Loader";

const ListArticles = () => {


  const { data: dataUploads } = useGetApplicationsQuery();
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPreload, setIsPreload] = useState(false)
  const [error, setError] = useState(false)
  const [nextPage, setNextPage] = useState(0)



  const getUserArticles = (page, count) => {
    setIsPreload(true)
    setError(false)
    ArticleApiFetch.getArticles(localStorage.getItem("user_token"), page, count)
      .then( (res) => {
        const {data, nextPage} = res
        // console.log(articlesHeader.nextPage)
        // console.log(articlesHeader.currentPage)
        // console.log(articlesHeader.allPages)
        setNextPage(nextPage)
        // nextPage = articlesHeader.nextPage
        data.then (res => {
          setArticles([...articles, ...res]);
        })
        setError(false)
        setIsLoading(false)
        setIsPreload(false)
      })
      .catch( (err) => {
        setError(true)
        setIsLoading(false)
        setIsPreload(false)
      })
  }

  useEffect( () => {
    setIsLoading(true)
    getUserArticles(1,5);
  },[])

  const handlerOnClick = () => {
    console.log(nextPage)
    if(nextPage > 0) {
      getUserArticles(nextPage, 5);
    }
  }

  if (isLoading) return  (
    <>
      <div className={styles.article__message}>
        <p className="text text_size_default text_weight_bold text_align_center">Подождите... Идет получение статей</p>
      </div>
      <SkeletonArticles />
    </>
  )

  if (error)
    return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error.message}
      />
    );

  if (!articles?.length)
    return (
      <div className="articles">
        <NewArticleCard/>
        <div></div>
        <div></div>
      </div>
    );

  return (
    <>
      <div className="articles">
        <NewArticleCard/>
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article?.articleId || "article" + Math.random()}
              article={article}
            />
          );
        })}
      </div>

      {isPreload && <Loader/>}

      {
        nextPage > 0 &&
        <button type="button" className={classNames(styles.article__button, "button button_type_tabs")}
                onClick={handlerOnClick}>Показать еще
        </button>
      }
      <ListUploads data={dataUploads} />
    </>

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
