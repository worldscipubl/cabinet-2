import React from "react";
import classNames from "classnames";
import style from "./Spinner.module.scss";

const Spinner = ({ className }) => {
  return (
    <i className={classNames(style.loader, className)} />
  );
};

export default Spinner;
