import React, {useEffect, useRef, useState} from "react";
import "./StepperItem.scss";
import ArticleChanges from "../../ArticleChanges";
import articleApiFetch from "../../../api/ApiFetch/ArticleApiFetch";
import Loader from "../../Loader";

const StepperItem = ({article, item, currentStage, onClick, openStage}) => {

  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const myRef = useRef(null)

  useEffect(() => {
    if(currentStage === item.stage) {
      getStatuses(currentStage)
      myRef.current.scrollIntoView();
    }
  },[]);

  const getStatuses = (stage) => {
    setIsLoading(true)
    articleApiFetch.articleChanges(article.articleId, localStorage.getItem('user_token'),stage, 0, 1000)
      .then(res => {
        setStatuses([])
        setStatuses((prev) => [...prev, ...res]);
        onClick(stage)
        setIsLoading(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const handleClick = (ref, stage) => {
    onClick(0)
    if (ref !== null) {
      ref.scrollIntoView();
    }
    getStatuses(stage)
  }

  return (
    <>
      <div className="stepper-item__header"
           onClick={() => handleClick(myRef.current, item.stage)}
           ref={myRef}
      >
        <span className={ item.stage >= currentStage ? "stepper-item__icon stepper-item__icon-current text" : "stepper-item__icon text"}>{item.stage}</span>
        <h3 className="stepper-item__title text text_size_accent text_weight_bold">
          {item.title}
        </h3>
      </div>
      {
        isLoading
        ?
          <Loader />
        :
          <div>
            <div className={ openStage && openStage === item.stage ? "stepper-item__content article-stage" : "stepper-item__content article-stage_active"}>
              <i className={ openStage && openStage === item.stage ? "stepper-item__border article-stage" : "stepper-item__border article-stage_active"}></i>
            </div>
            <div className={openStage && openStage === item.stage ? "article-stage_active" : "article-stage"}>
                <ArticleChanges article={article} stage={item.stage} statuses={statuses}/>
            </div>
          </div>
      }
    </>
  );
};

export default StepperItem;
