import React from "react";
import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../domain/EmptyState";

const EducationPage = () => {
  return (
    <MainLayout title="Обучние">
      <EmptyState
        title="Обучние"
        description="Данная страница находиться в разработке"
        imgName="under_construction" />
    </MainLayout>
  );
};

export default EducationPage;
