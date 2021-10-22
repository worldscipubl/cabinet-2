import React, { useEffect, useState } from "react";
import Tab from "./Tab/Tab";
import PropTypes from "prop-types";
import "./Tabs.scss";

const Tabs = ({
                children,
                handlers: { handlerAddTab } = {},
                options: { isExtensible, tabsLimit } = {}
              }) => {
  if (!Array.isArray(children)) children = React.Children.toArray(children);

  const [activeTab, setActiveTab] = useState(children[0].props?.label);
  const [tabs, setTabs] = useState(children);
  const onClickAddTab = () => {
    if (!handlerAddTab) return;
    const newTab = handlerAddTab({ tabs });
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.props.label);
  };

  useEffect(() => {
    setTabs(children);
  }, [children]);

  const getTabs = () => {
    return tabs.map((child) => {
      const { label } = child.props;

      return (
        <Tab
          activeTab={activeTab}
          key={label}
          label={label}
          id={label}
          onClick={(tab) => setActiveTab(tab)}
        />
      );
    });
  };

  const getNewTabBtn = () => {
    if (!isExtensible || tabs.length >= tabsLimit) return;
    return (
      <Tab
        activeTab={activeTab}
        key="add-tab-btn"
        label="Добавить автора"
        id="add-tab-btn"
        onClick={onClickAddTab}
      />
    );
  };

  return (
    <div className="tabs">
      <ul className="tabs__bar">
        {getTabs()} {getNewTabBtn()}
      </ul>
      <section className="tabs__content">
        {tabs.filter((child) => child.props.label === activeTab)}
      </section>
    </div>
  );
};

export default Tabs;
