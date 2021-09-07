import React from "react";
import "./Checkbox.scss";

const Checkbox = ({ label, children }) => {
  return (
    <div className="checkbox__wrapper">
      <label className="checkbox">
        {children}
        <i></i>
        <span className="text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
