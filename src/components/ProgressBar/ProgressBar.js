import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ progress, fraction }) => {
  if (fraction) progress = fraction * 100;
  return (
    <div className="progress-bar progress-bar_animated">
      <div
        className="progress-bar__indicator bg-happy-green"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
