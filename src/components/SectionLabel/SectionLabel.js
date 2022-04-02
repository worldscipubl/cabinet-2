import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./SectionLabel.module.scss";

const SectionLabel = ({ className, title, description, ...props }) => {
  return (
    <div className={className} {...props}>
      <h2 className={classNames(cn.Title, "text text_color_gray-blue")}>
        {title || "Заголовок не указан"}
      </h2>
      <h2
        className={classNames(
          cn.Description,
          "text text_size_default text_color_gray"
        )}
      >
        {description || ""}
      </h2>
    </div>
  );
};

SectionLabel.defaultProps = {
  title: "",
  description: "",
};

SectionLabel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SectionLabel;
