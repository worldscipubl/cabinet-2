import React from "react";
import classNames from "classnames";

const ViewPagerBar = ({ activeStep, steps, handleTabClick }) => {
  return (
    <ul className="view-pager__bar">
      {steps.map((label, index) => {
        return (
          <li
            className={classNames("view-pager__step", {
              complete: index < activeStep,
              active: index === activeStep,
              clickable: handleTabClick,
            })}
            key={label}
            onClick={() => handleTabClick && handleTabClick(index)}
          >
            <div className="view-pager__step-inner">
              <span className="view-pager__step-icon text"></span>
              <h3 className="view-pager__step-title text">{label}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ViewPagerBar;
