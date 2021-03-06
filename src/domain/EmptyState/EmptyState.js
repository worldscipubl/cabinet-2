import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import cn from "./EmptyState.module.scss";
import Undraw from "react-undraw";

const EmptyState = ({
  className,
  type,
  title,
  description,
  imgName,
  children,
}) => {
  function getImgName() {
    if (type === "warning") return "warning";

    if (!imgName) return "not_found";
    return imgName;
  }

  return (
    <div className={classNames(cn.Wrapper)}>
      <div className={classNames(cn.Container, className)}>
        <Undraw
          name={getImgName()}
          height="auto"
          style={{ width: "65%" }}
          className={classNames(cn.ContainerItem, cn.Img)}
        />
        {title && (
          <h3 className={classNames(cn.ContainerItem, cn.Title, "text")}>
            {title}
          </h3>
        )}

        {description && (
          <p
            className={classNames(cn.ContainerItem, cn.Description, "text", {
              text_color_red: type === "warning",
            })}
          >
            {description}
          </p>
        )}

        {children && (
          <div className={classNames(cn.ContainerItem, cn.ContainerItemAction)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

EmptyState.defaultProps = {
  title: "",
  description: "",
  imgName: "",
  type: "",
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgName: PropTypes.string,
};

export default EmptyState;
