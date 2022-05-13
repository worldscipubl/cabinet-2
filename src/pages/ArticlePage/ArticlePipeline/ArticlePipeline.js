import React, {useState} from "react";
import ArticleSummary from "../../../components/ArticleSummary/ArticleSummary";
import Stepper from "../../../components/Stepper/Stepper";

const ArticlePipeline = ({ article }) => {
  const { currentStage } = article;
  const [openStage, setOpenStage] = useState(currentStage);

  const handlerClickStepper = (data) => {
    setOpenStage(data)
  }

  return (
    <>
      <ArticleSummary article={article} />
      <Stepper currentStage={currentStage} article={article} openStage={openStage} onClick={handlerClickStepper}/>
    </>
  );
};

export default ArticlePipeline;
