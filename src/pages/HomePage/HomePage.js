import React from "react";
import EmptyState from "../../domain/EmptyState";
import withMainLayout from "../../hoc/withMainLayout";
import "./HomePage.module.scss";

const HomePage = ({ ...props }) => {
  return (
    <EmptyState
      title="Главная"
      description="Данная страница находиться в разработке"
      imgName="under_construction"
    />
  );
};

export default withMainLayout(HomePage, { title: "Главная" });
