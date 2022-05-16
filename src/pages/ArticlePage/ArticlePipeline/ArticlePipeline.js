import React, {useEffect, useRef} from "react";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import Stepper from "../../../components/Stepper/Stepper";
import {useHistory} from "react-router-dom";

const ArticlePipeline = ({ article }) => {
  const { currentStage } = article;
  const upRef = useRef(null)

  const history = useHistory()
  useEffect( () => {
    history.push(`/article/${article.articleId}/article-pipeline`)
  },[])

  return (
    <>
      <div ref={upRef}>
      <ArticleSummary article={article} />
      <Stepper currentStage={currentStage} article={article} />
      </div>
    </>
  );
};

export default ArticlePipeline;
