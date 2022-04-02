import React from "react";
import MainLayout from "../layouts/MainLayout";

const withMainLayout =
  (Component, propsLayout, makeTitle) =>
  ({ ...props }) => {
    const { title: defaultTitle = "" } = propsLayout;
    const title = makeTitle?.({ ...props }) || defaultTitle;

    return (
      <MainLayout {...propsLayout} title={title}>
        <Component {...props} />
      </MainLayout>
    );
  };

export default withMainLayout;
