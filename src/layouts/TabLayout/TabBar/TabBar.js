import React from "react";
import AppBar from "../../AppBar/AppBar";
import TabButton from "../TabButton";
import classNames from "classnames";

const TabBar = ({ className, activeTab, title, hideTabsBar = false, children, handleTab }) => {

  const handlerTab = (tabId) => {
    if (!tabId) return;
    if (!handleTab) return;
    handleTab(tabId);
  };

  return (
    <AppBar title={title} hideTabsBar={hideTabsBar}>
      {activeTab && <ul className={classNames("app-bar__tabs", className)}>
        {children.map((child) => {
          const { tabId = "default", tabLabel = "default" } = child.props;
          return (
            <TabButton
              activeTab={activeTab}
              id={tabId}
              key={tabId}
              label={tabLabel}
              onClick={() => handlerTab(tabId)}
            />
          );
        })}
      </ul>}
    </AppBar>
  );
};

export default TabBar;
