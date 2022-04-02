import React from "react";
import classNames from "classnames";
import cn from "./Table.module.scss";

const Table = ({ className, children }) => {
  return <table className={classNames(cn.Table, className)}>{children}</table>;
};

export default Table;
