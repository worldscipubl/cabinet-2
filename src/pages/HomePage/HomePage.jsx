import React from "react";
import "./HomePage.module.scss";
import MainLayout from "../../layouts/MainLayout";
import { Route } from "react-router-dom";
import classNames from "classnames";
import EmptyState from "../../domain/EmptyState";

const HomePage = (props) => {
  return (
    <MainLayout title="Главная">
      <EmptyState
        title="Главная"
        description="Данная страница находиться в разработке"
        imgName="under_construction" />
    </MainLayout>
  );
};

export default HomePage;
