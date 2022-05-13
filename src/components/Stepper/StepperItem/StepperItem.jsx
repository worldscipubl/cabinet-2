import React from "react";
import "./StepperItem.scss";
import ArticleChanges from "../../ArticleChanges";

const StepperItem = ({article, item, clickStage, statuses, isLoading}) => {

  return (
    <>
      <div className={ clickStage && clickStage === item.stage ? "stepper-item__content article-stage" : "stepper-item__content article-stage_active"}>
        <i className={ clickStage && clickStage === item.stage ? "stepper-item__border article-stage" : "stepper-item__border article-stage_active"}></i>
      </div>
      <div className={clickStage && clickStage === item.stage ? "article-stage_active" : "article-stage"}>
        <ArticleChanges article={article} stage={item.stage} statuses={statuses} isLoading={isLoading} />
      </div>
    </>
  );
};

export default StepperItem;
