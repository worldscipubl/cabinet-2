import React from "react";
import EmptyState from "../../domain/EmptyState";
import withMainLayout from "../../hoc/withMainLayout";

const EducationPage = () => {
    return (
        <EmptyState
            title="Обучние"
            description="Данная страница находиться в разработке"
            imgName="under_construction"/>
    );
};

export default withMainLayout(EducationPage, {title: "Обучние"});
