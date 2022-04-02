import React from "react";
import classNames from "classnames";
import cn from "./TableBody.module.scss";

const TableBody = ({ className, children }) => {
  return (
    <tbody className={classNames(cn.TableBody, className)}>{children}</tbody>
  );
};

export default TableBody;
