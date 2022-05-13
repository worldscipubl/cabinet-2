import React, {useEffect, useRef} from "react";
import "./StepperItem.scss";
import ArticleChanges from "../../ArticleChanges";

const StepperItem = ({article, item, statuses, isLoading, openStage}) => {

  const myRef = useRef(null)

  useEffect(() => {
    myRef.current.scrollIntoView()
  },[openStage, statuses]);

  return (
    <>
      <div className={ openStage && openStage === item.stage ? "stepper-item__content article-stage" : "stepper-item__content article-stage_active"}>
        <i className={ openStage && openStage === item.stage ? "stepper-item__border article-stage" : "stepper-item__border article-stage_active"}></i>
      </div>
      <div className={openStage && openStage === item.stage ? "article-stage_active" : "article-stage"} ref={myRef}>
        <ArticleChanges article={article} stage={item.stage} statuses={statuses} isLoading={isLoading} />
      </div>
    </>
  );
};

export default StepperItem;
