import React, {useEffect, useState} from "react";
import "./Stepper.scss";
import {articlePipelineStages} from '../../utils/constants'
import StepperItem from "./StepperItem/StepperItem";
import articleApiFetch from "../../api/ApiFetch/ArticleApiFetch";

const Stepper = ({currentStage, article, openStage, onClick}) => {
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    articleApiFetch.articleChanges(article.articleId, localStorage.getItem('user_token'),openStage, 0, 1000)
      .then(res => {
        setStatuses([])
        setStatuses((prev) => [...prev, ...res]);
        setIsLoading(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }, [openStage]);

  return (
    articlePipelineStages.map((item, index) => (
      <li className={ item.stage <= currentStage ? `stepper-item` : `stepper-item stepper-disabled`}>
        <div className="stepper-item__header"
             onClick={() => onClick(item.stage)}
        >
          <span className={ item.stage >= currentStage ? "stepper-item__icon stepper-item__icon-current text" : "stepper-item__icon text"}>{item.stage}</span>
          <h3 className="stepper-item__title text text_size_accent text_weight_bold">
            {item.title}
          </h3>
        </div>
        <StepperItem article={article}
                     item={item}
                     statuses={statuses}
                     isLoading={isLoading}
                     openStage={openStage}
        />
      </li>
    ))
  );
};

export default Stepper;
