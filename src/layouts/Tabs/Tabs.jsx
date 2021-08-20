import React, { useState } from "react";
import "./Tabs.scss";
import Tab from "./Tab/Tab";
import PropTypes from "prop-types";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ul className="tabs__bar">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ul>
      <section className="tab__content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return;
          return child.props.children;
        })}
      </section>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
