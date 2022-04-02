import React from "react";
import classNames from "classnames";
import CircularProgress from "../CircularProgress";
import cn from "./DialogBody.module.scss";

const DialogBody = ({ className, children, isLoading }) => {
  return (
    <div
      className={classNames(cn.Wrapper, className, {
        [cn.isLoading]: isLoading,
      })}
    >
      {children}
      {isLoading && (
        <CircularProgress
          className={classNames(cn.Progress)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DialogBody;
