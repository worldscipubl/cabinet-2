import React from "react";
import classNames from "classnames";
import Spinner from "../Spinner";
import cn from "./PreloadingScreen.module.scss";

const PreloadingScreen = ({ isLoading }) => {
  return (
    <div className={classNames(cn.loaderWrapper, { [cn.loaded]: !isLoading })}>
      <Spinner className={classNames(cn.loader)} />
      <div className={classNames(cn.loaderSection, cn.sectionLeft)}></div>
      <div className={classNames(cn.loaderSection, cn.sectionRight)}></div>
    </div>
  );
};

export default PreloadingScreen;
