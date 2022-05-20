import React from "react";
import "../Field.module.scss";

const DateField = ({
  label,
  description,
  error,
  helperText,
  className,
  options: { startIcon, endIcon } = {},
  handlers: { handlerEndIcon, handlerField } = {},
  ...props
}) => {

  return (
    <label className="field__container">
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
    </label>
  );
};

export default DateField;
