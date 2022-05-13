import React, {useState} from "react";
import "./Stepper.scss";
// import classNames from "classnames";
import {articlePipelineStages} from '../../utils/constants'
import StepperItem from "./StepperItem/StepperItem";
import articleApiFetch from "../../api/ApiFetch/ArticleApiFetch";
// import ArticleChanges from "../ArticleChanges";

const Stepper = ({ className, currentStage, children, article }) => {
  const [clickStage, setClickStage] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlerClick = (data) => {
    setClickStage(data)
      setIsLoading(true)
      articleApiFetch.articleChanges(article.articleId, localStorage.getItem('user_token'),data, 0, 1000)
        .then(res => {
          setStatuses([])
          setStatuses((prev) => [...prev, ...res]);
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
  }

  return (
    articlePipelineStages.map((item, index) => (
      <li className={`stepper-item`}>
        <div className="stepper-item__header"
             onClick={() => handlerClick(item.stage)}
        >
          <span className={ item.stage === currentStage ? "stepper-item__icon stepper-item__icon-current text" : "stepper-item__icon text"}>{item.stage}</span>
          <h3 className="stepper-item__title text text_size_accent text_weight_bold">
            {item.title}
          </h3>
        </div>
        <StepperItem article={article} item={item} clickStage={clickStage} statuses={statuses} isLoading={isLoading} />
      </li>
    ))
  );
};

export default Stepper;
