import React, { useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import cn from "./Badge.module.scss";

const Badge = ({ children, className, injecting, ...props }) => {
  if (injecting) return <BadgeContent className={className} {...props} />;

  return (
    <div className={classNames(cn.Wrapper, className)}>
      <BadgeContent {...props} />
      {children}
    </div>
  );
};

function BadgeContent({
  className,
  classesBadge,
  value = 0,
  anchorOrigin,
  showZero,
}) {
  const anchorOriginPos = !classesBadge
    ? `${anchorOrigin?.vertical}/${anchorOrigin?.horizontal}`
    : null;

  if (!value && !showZero) return null;

  return (
    <span
      className={classNames(cn.Badge, className, classesBadge, "text", {
        [cn.anchorOriginTopLeft]: anchorOriginPos === "top/left",
        [cn.anchorOriginTopRight]: anchorOriginPos === "top/right",
        [cn.anchorOriginBottomLeft]: anchorOriginPos === "bottom/left",
        [cn.anchorOriginBottomRight]: anchorOriginPos === "bottom/right",
        [cn.anchorOriginYCenterRight]: anchorOriginPos === "center/right",
      })}
    >
      {value}
    </span>
  );
}

Badge.defaultProps = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  invisible: false,
  maxValue: 99,
  value: 0,
  showZero: false,
  classesBadge: null,
  variant: "standard",
};

Badge.propTypes = {
  value: PropTypes.node,
  children: PropTypes.node,
  invisible: PropTypes.bool,
  injecting: PropTypes.bool,
  showZero: PropTypes.bool,
  maxValue: PropTypes.number,
  classesBadge: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  variant: PropTypes.oneOf(["dot", "standard"]),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(["bottom", "top", "center"]),
    horizontal: PropTypes.oneOf(["left", "right"]),
  }),
};

export default Badge;
