import React from "react";
import "./ArticleStages.scss";
import StepperItem from "../Stepper/StepperItem/StepperItem";
import ArticleStatus from "../../ArticleStatus/ArticleStatus";
import Stepper from "../Stepper/Stepper";
import ArticleChanges from "../ArticleChanges/ArticleChanges";

const ArticleStages = ({ currentStage, statuses, getArticleChanges }) => {
  return (
    <Stepper currentStage={currentStage}>
      {stagesList.map(({ title, stage }) => (
        <StepperItem key={stage + Math.random()} title={title} id={stage}>
          <ArticleChanges
            statuses={statuses}
            stage={stage}
            getArticleChanges={getArticleChanges}
          />
        </StepperItem>
      ))}
    </Stepper>
  );
};

const stagesList = [
  { title: "Технический аудит", stage: 1 },
  { title: "Заключение договора", stage: 2 },
  { title: "Перевод на академический английский язык", stage: 3 },
  {
    title:
      "Предварительная экспертная оценка действующим рецензентом международного журнала",
    stage: 4,
  },
  { title: "Таргетированный подбор журнала", stage: 5 },
  { title: "Научное редактирование", stage: 6 },
  { title: "Вычитка носителем языка", stage: 7 },
  { title: "Финальная подготовка к отправке в журнал", stage: 8 },
  { title: "Подача в журнал", stage: 9 },
  { title: "Сопровождение на этапах рецензирования", stage: 10 },
  { title: "Публикация и индексация статьи", stage: 11 },
];

export default ArticleStages;
