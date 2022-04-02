import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewPagerBar from "../ViewPager/ViewPagerBar";
import "./ViewPager.scss";

const ViewPager = ({
  tabs = [],
  pages,
  handlers,
  options: {
    initStep,
    hideActionBar,
    hideBackBtn,
    hideNextBtn,
    nextBtnLabel,
    backBtnLabel,
    resetBtnLabel,
    finishBtnLabel,
    clickableTabs,
    statePages = false,
  } = {},
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
        {activeStep === tabs.length ? (
          <button
            onClick={handleReset}
            className="button button_type_main view-pager__action"
          >
            {resetBtnLabel || "Сбросить"}
          </button>
        ) : (
          <div>
            {activeStep === 0 ||
              (!hideBackBtn && (
                <button
                  onClick={handleBack}
                  className="button button_type_main view-pager__action"
                >
                  {backBtnLabel || "Назад"}
                </button>
              ))}
            {!hideNextBtn && statePages[activeStep] && (
              <button
                onClick={handleNext}
                className="button button_type_main active view-pager__action"
              >
                {activeStep === tabs.length - 1
                  ? finishBtnLabel || "Закончить"
                  : nextBtnLabel || "Далее"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="view-pager">
      <ViewPagerBar
        activeStep={activeStep}
        steps={tabs}
        handleTabClick={clickableTabs ? handleTabClick : undefined}
      />
      {getStepContent(pages, activeStep)}
      {!hideActionBar && <ActionBar />}
    </div>
  );
};

const getStepContent = (pages, step) => {
  if (!pages || !pages(step)) return "Unknown step";
  return pages(step);
};

ViewPager.propTypes = {
  // Properties
  tabs: PropTypes.instanceOf(Array).isRequired,
  pages: PropTypes.instanceOf(Function).isRequired,
};

export default ViewPager;
