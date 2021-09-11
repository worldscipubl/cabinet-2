import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewPagerBar from "../ViewPager/ViewPagerBar";
import "./ViewPager.scss";

const ViewPager = ({
                     steps = [],
                     pages,
                     handlers,
                     options: {
                       initStep,
                       hideBackBtn,
                       hideNextBtn,
                       nextBtnLabel,
                       backBtnLabel,
                       resetBtnLabel,
                       finishBtnLabel,
                       clickableTabs
                     } = {}
                   }) => {
  const [activeStep, setActiveStep] = useState(initStep || 0);

  const handleNext = () => {
    const res = handlers?.handleNext ? handlers.handleNext() : true;
    res && setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const res = handlers?.handleBack ? handlers.handleBack() : true;
    res && setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    const res = handlers?.handleReset ? handlers.handleReset() : true;
    res && setActiveStep(0);
  };

  const handleTabClick = (tab) => {
    setActiveStep(tab);
  };

  const ActionBar = () => {
    return (
      <div className="view-pager__actions">
        {activeStep === steps.length ? (
          <button
            onClick={handleReset}
            className="button button_type_main view-pager__action"
          >
            {resetBtnLabel || "Reset"}
          </button>
        ) : (
          <div>
            {activeStep === 0 ||
            (!hideBackBtn && (
              <button
                onClick={handleBack}
                className="button button_type_main view-pager__action"
              >
                {backBtnLabel || "Back"}
              </button>
            ))}
            {!hideNextBtn && (
              <button
                onClick={handleNext}
                className="button button_type_main active view-pager__action"
              >
                {activeStep === steps.length - 1
                  ? finishBtnLabel || "Finish"
                  : nextBtnLabel || "Next"}
              </button>)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="view-pager">
      <ViewPagerBar
        activeStep={activeStep}
        steps={steps}
        handleTabClick={clickableTabs ? handleTabClick : undefined}
      />
      {getStepContent(pages, activeStep)}
      <ActionBar />
    </div>
  );
};

const getStepContent = (pages, step) => {
  if (!pages || !pages(step)) return "Unknown step";
  return pages(step);
};

ViewPager.propTypes = {
  // Properties
  steps: PropTypes.instanceOf(Array).isRequired,
  pages: PropTypes.instanceOf(Function).isRequired
};

export default ViewPager;
