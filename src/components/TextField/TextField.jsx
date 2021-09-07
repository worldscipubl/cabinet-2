import React, { useState } from "react";
import classNames from "classnames";
import "./TextField.scss";

const TextField = ({
  label,
  description,
  children,
  error,
  helperText,
  className,
  appearance: { type } = {},
  options: { startIcon, endIcon } = {},
  handlers: { handlerEndIcon },
}) => {
  const textFieldStyle = classNames("text-field", className, {
    error: error,
  });

  return (
    <div className={textFieldStyle}>
      <label>
        <h4 className="text text-field__label">{label}</h4>
        <p className="text text_color_gray text-field__description">
          {description}
        </p>
        <div className="text-field__container">
          {startIcon && (
            <img className="start-icon" src={startIcon} alt="start-icon" />
          )}
          {endIcon && (
            <img
              className="end-icon"
              src={endIcon}
              alt="end-icon"
              onClick={handlerEndIcon}
            />
          )}
          {children}
        </div>
      </label>
      <div className="text-field__helper">
        <p className="text-field__helper-msg">{helperText}</p>
      </div>
    </div>
  );
};

export default TextField;
