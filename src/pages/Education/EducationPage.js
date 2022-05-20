import React, {useEffect} from "react";
import EmptyState from "../../domain/EmptyState";
import withMainLayout from "../../hoc/withMainLayout";
import {useHistory} from "react-router-dom";

const EducationPage = () => {
  const history = useHistory();

  useEffect( () => {
    history.push(`/education`)
  },[])

  return (
    <EmptyState
      title="Обучение"
      description="Данная страница находиться в разработке"
      imgName="under_construction"
    />
  );
};

export default withMainLayout(EducationPage, { title: "Обучение" });
