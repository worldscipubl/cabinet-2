import React, {useEffect, useRef} from "react";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import Stepper from "../../../components/Stepper/Stepper";
import {useHistory, useParams} from "react-router-dom";

const ArticlePipeline = ({ article }) => {
  const { currentStage } = article;
  const upRef = useRef(null)

  const history = useHistory()
  const {articleId, tabId} = useParams()

  useEffect( () => {
    history.push(`/article/${articleId}/article-pipeline`)
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
