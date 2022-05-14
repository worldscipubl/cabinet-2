import React, {useState} from "react";
import "./Stepper.scss";
import {articlePipelineStages} from '../../utils/constants'
import StepperItem from "./StepperItem/StepperItem";

const Stepper = ({currentStage, article, onClick}) => {
  const [openStage, setOpenStage] = useState(0);

  const handlerSetOpenStage = (stage) => {
    setOpenStage(stage)
  }

  return (
    articlePipelineStages.map((item, index) => (
      <li className={ item.stage <= currentStage ? `stepper-item` : `stepper-item stepper-disabled`}>
        <StepperItem article={article}
                     item={item}
                     openStage={openStage}
                     onClick={handlerSetOpenStage}
                     currentStage={currentStage}
        />
      </li>
    ))
  );
};

export default Stepper;
