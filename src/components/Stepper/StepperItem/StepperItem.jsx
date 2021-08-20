import React from "react";
import "./StepperItem.scss";

const StepperItem = ({ children, state, title, onClick }) => {
  const stateStyle = getStateStyle(state);

  return (
    <li className={`stepper-item ${stateStyle}`}>
      <div className="stepper-item__header" onClick={onClick}>
        <span className="stepper-item__icon text"></span>
        <h3 className="stepper-item__title text text_size_accent text_weight_bold">
          {title}
        </h3>
      </div>
      <div className="stepper-item__content">
        <i className="stepper-item__border"></i>
        <div className="stepper-item__inner">{children}</div>
      </div>
    </li>
  );
};

const getStateStyle = (state) => {
  if (!state) return "";

  let stateStyle = "";
  Object.entries(state).map(([key, value]) => {
    value && (stateStyle += ` ${key.toString()}`);
  });

  return stateStyle;
};
export default StepperItem;
