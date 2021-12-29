import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProgressBar from "../ProgressBar/ProgressBar";
import withBadge from "../../hoc/withBadge";
import cn from "./ArticleCard.module.scss";

const ArticleCard = ({ className, article, isLoading, badge }) => {
  const {
    articleId,
    statusTitle,
    title,
    journal,
    tariff,
    progress
  } = article || {};

  return (
    <Link className={classNames(cn.LinkWrapper, className)}
          to={`/article/${articleId}`}>
      <div className={classNames(cn.Container)}>
        <div className={classNames(cn.Item)}>
            <span className="text text_weight_bold text_color_gray">
              {isLoading ? <Skeleton className={classNames(cn.Skeleton)} /> : `№${articleId || -1}`}
            </span>
        </div>
        <div className={classNames(cn.Item)}>
          <p className="text text_size_large">
            {isLoading ?
              <Skeleton className={classNames(cn.Skeleton, { [cn.half]: true })} /> :
              (<>
                {progress ? Math.floor(progress) : 0}
                <sup className="text_size_title">%</sup>
              </>)}
          </p>
        </div>
        <div className={classNames(cn.Item)}>
          <ProgressBar progress={progress || 0} />
        </div>
        <div className={classNames(cn.Item)}>
          <p className="text text_color_black">
            {isLoading ? <Skeleton className={classNames(cn.Skeleton)} /> : `${title || "Название статьи не указано"}`}
          </p>
        </div>
        <div className={classNames(cn.Item)}>
          <h3 className="text">
            {isLoading ? <Skeleton className={classNames(cn.Skeleton)} /> :
              `${journal || "не указано"} / ${tariff || "не указано"}`}
          </h3>
        </div>
        <div className={classNames(cn.Item)}>
          <h4 className="text text_color_gray">ЭТАП:</h4>
          <h4 className="text text_color_gray">
            {isLoading ? <Skeleton className={classNames(cn.Skeleton)} /> : statusTitle || "Этап не указан"}
          </h4>
        </div>
      </div>
      {badge}
    </Link>
  );
};

export default withBadge(ArticleCard, { injecting: true });
