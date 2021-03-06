import React, {useEffect, useLayoutEffect, useState} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import styles from './ListArticles.module.scss'
import imgPlus from "../../common/images/icons/plus.svg";
import ListUploads from "../ListUploads";
import Loader from "../Loader";
import EmptyState from "../../domain/EmptyState";
import ArticleCard from "../ArticleCard";
import ArticleApiFetch from "../../api/ApiFetch/ArticleApiFetch";
import BeforeApplicationFetch from "../../api/ApiFetch/BeforeApplicationFetch";
import {displayCards} from "../../utils/functions"

// import {useGetApplicationsQuery} from "../../api/endpoints/BeforeArticleApi";
// import cn from "../../layouts/TabLayout/TabButton/TabButton.module.scss";
// import PropTypes from "prop-types";
// import Spinner from "../Spinner";

const ListArticles = () => {

  // const { data: dataUploads } = useGetApplicationsQuery();

  //articles - массив статей пользователя, beforeApplication - массив зааявок для подтверждения
  const [articles, setArticles] = useState([])
  const [beforeApplication, setBeforeApplication] = useState([])

  //isLoading - идет начальная загрузка, isPreload - идет подгрузка, error - возникла ошибка
  const [isLoading, setIsLoading] = useState(false)
  const [isPreload, setIsPreload] = useState(false)
  const [error, setError] = useState(false)

  //Всего статей у пользователя, последняя отображаемая статья,
  // количество тоображаемых статей на одном шаге, текущее разрешение экрана (переменные для пагинации)
  const [allArticles, setAllArticles] = useState(0)
  const [currentArticles, setCurrentArticles] = useState(0)
  const [incrementPosition, setIncrementPosition] = useState(window.innerWidth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    const position = displayCards(screenWidth)
    setIncrementPosition(position.step)
    setIsLoading(true)
    getUserArticles(0,position.init);
    setCurrentArticles(position.init)
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth) > {}
  }, [])

  useEffect(() => {
    const position = displayCards(screenWidth)
    setIncrementPosition(position.step)
  }, [screenWidth])

  const getUserArticles = (offset, count) => {
    setIsPreload(true)
    setError(false)
    ArticleApiFetch.getArticles(localStorage.getItem("user_token"), offset, count)
      .then( (res) => {
        const {data, allArticles} = res
        setAllArticles(allArticles)
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
    BeforeApplicationFetch.getBeforeApplications(localStorage.getItem("user_token"))
      .then( (res) => {
        setBeforeApplication(res)
      })
      .catch( (err) => {
        console.log(err)
      })
  },[])

  const handlerOnClick = () => {
    if(allArticles > currentArticles) {
      getUserArticles(currentArticles, incrementPosition);
      setCurrentArticles(currentArticles + incrementPosition)
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
        allArticles > currentArticles &&
        <button type="button" className={classNames(styles.article__button, "button button_type_tabs")}
                onClick={handlerOnClick}>Показать еще
        </button>
      }

      {
        beforeApplication.length > 0 &&
        <ListUploads data={beforeApplication}/>
      }
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

// ListArticles.defaultProps = {
//   data: null,
//   isLoading: false,
//   spinner: false,
// };
//
// ListArticles.propTypes = {
//   data: PropTypes.array,
//   error: PropTypes.object,
//   isLoading: PropTypes.bool.isRequired,
//   spinner: PropTypes.bool,
// };

export default ListArticles;
