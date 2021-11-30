import React from "react";
import classNames from "classnames";
import "../Field.module.scss";

const SelectField = ({
                     label,
                     description,
                     error,
                     helperText,
                     className,
                     options: { startIcon, endIcon } = {},
                     handlers: { handlerEndIcon, handlerField } = {},
                     ...props
                   }) => {
  const SelectFieldStyle = classNames("field", className, {
    error: error
  });

  return (
    <div className={SelectFieldStyle}>
      <label>
        <h4 className="text field__label">{label}</h4>
        <p className="text text_color_gray field__description">
          {description}
        </p>
        <div className="field__container">
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
          <input {...props} />
        </div>
      </label>
      <div className="field__helper">
        <p className="field__helper-msg">{helperText}</p>
      </div>
    </div>
  );
};

export default SelectField;
