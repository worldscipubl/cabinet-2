import React from "react";
import classNames from "classnames";
import Paper from "../Paper";
import cn from "./CardHeadband.module.scss";

const CardHeadband = ({
  className,
  children,
  subHeader,
  title = "Заголовок отсутствует",
}) => {
  return (
    <Paper className={classNames(cn.Container, className)}>
      <div className={classNames(cn.Header)}>
        <h2
          className={classNames(
            cn.Title,
            "text text_size_accent text_weight_bold text_color_white"
          )}
        >
          {title}
        </h2>
      </div>
      {subHeader && <div className={classNames(cn.SubHeader)}>{subHeader}</div>}
      <div className={classNames(cn.Body)}>{children}</div>
    </Paper>
  );
};

export default CardHeadband;
