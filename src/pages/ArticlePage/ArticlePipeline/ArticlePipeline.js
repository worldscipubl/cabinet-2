import React, {useRef} from "react";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import Stepper from "../../../components/Stepper/Stepper";

const ArticlePipeline = ({ article }) => {
  const { currentStage } = article;
  const upRef = useRef(null)

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
