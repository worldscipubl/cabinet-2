import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./Paper.module.scss";

const Paper = ({ className, children }) => {
  return <div className={classNames(cn.Paper, className)}>{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Paper;
