import React from "react";
import classNames from "classnames";
import cn from "./TableHead.module.scss";

const TableHead = ({ className, children }) => {
  return (
    <thead className={classNames(cn.TableHead, className)}>
    {children}
    </thead>
  );
};

export default TableHead;
