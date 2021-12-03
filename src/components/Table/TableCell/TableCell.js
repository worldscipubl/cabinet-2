import React from "react";
import classNames from "classnames";
import cn from "./TableCell.module.scss";

const TableCell = ({ className, children }) => {
  return (
    <th className={classNames(cn.TableCell, className)}>
      {children}
    </th>
  );
};

export default TableCell;
