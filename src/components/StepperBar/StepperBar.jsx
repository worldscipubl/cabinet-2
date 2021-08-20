import React from "react";
import "./StepperBar.scss";

const StepperBar = () => {
  return (
    <div className="stepper-bar">
      <h4 className="stepper-bar__title text text_size_accent text_weight_bold">
        Технический аудит
      </h4>
      <div className="stepper-bar_step-0 steps">
        <div className="stepper-bar__inner">
          <div className="stepper-bar__bar">
            <div className="stepper-bar__bar-inner"></div>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_1">
            <span className="stepper-bar__circle-text">1</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_2">
            <span className="stepper-bar__circle-text">2</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_3">
            <span className="stepper-bar__circle-text">3</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_4">
            <span className="stepper-bar__circle-text">4</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">5</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">6</span>
          </div>

          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">7</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">8</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">9</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">10</span>
          </div>
          <div className="stepper-bar__circle stepper-bar__circle_5">
            <span className="stepper-bar__circle-text">11</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperBar;
