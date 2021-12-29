import React from "react";
import MainLayout from "../layouts/MainLayout";

const withMainLayout = (Component, propsLayout) => ({ ...props }) => (
  <MainLayout {...propsLayout}>
    <Component {...props} />
  </MainLayout>
);

export default withMainLayout;
