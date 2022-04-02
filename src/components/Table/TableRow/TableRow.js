import React from "react";
import classNames from "classnames";
import cn from "./TableRow.module.scss";

const TableRow = ({ className, children }) => {
  return <tr className={classNames(cn.TableRow, className)}>{children}</tr>;
};

export default TableRow;
