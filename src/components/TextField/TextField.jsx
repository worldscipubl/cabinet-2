import React from "react";
import "./TextField.scss";

const TextField = ({
  startIcon,
  endIcon,
  label,
  children,
  error,
  helperText,
}) => {
  const style = `text-field ${error ? "error" : ""}`;
  return (
    <div className={style}>
      <div className="text-field__container">
        {startIcon && <img className="start-icon" src={startIcon}  alt="start-icon"/>}
        {endIcon && <img className="end-icon" src={endIcon} alt="end-icon"/>}
        {/*data-type="button"*/}
        {children}
        <label>{label}</label>
      </div>

      <div className="text-field__helper">
        <p className="text-field__helper-msg">{helperText}</p>
      </div>
    </div>
  );
};

export default TextField;
