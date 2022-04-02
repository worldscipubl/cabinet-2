import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./SpoilerArrow.module.scss";

const SpoilerArrow = ({ isOpen, className, ...props }) => {
  return (
    <span className={classNames(cn.ArrowWrapper, className)} {...props}>
      <svg
        className={classNames(cn.ArrowImg, { [cn.open]: isOpen })}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </span>
  );
};

SpoilerArrow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default SpoilerArrow;
