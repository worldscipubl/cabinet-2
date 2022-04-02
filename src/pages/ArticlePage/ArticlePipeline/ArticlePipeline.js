import React from "react";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import Stepper from "../../../components/Stepper/Stepper";
import StepperItem from "../../../components/Stepper/StepperItem/StepperItem";
import ArticleChanges from "../../../components/ArticleChanges";
import { articlePipelineStages } from "../../../utils/constants";

const ArticlePipeline = ({ article }) => {
  const { currentStage } = article;

  return (
    <>
      <ArticleSummary article={article} />
      <Stepper currentStage={currentStage}>
        {articlePipelineStages.map(({ title, stage }) => (
          <StepperItem key={`${stage}-${title}`} title={title} id={stage}>
            <ArticleChanges article={article} stage={stage} />
          </StepperItem>
        ))}
      </Stepper>
    </>
  );
};

export default ArticlePipeline;
