import React from "react";
import Tab from "../../Tabs/Tab/Tab";
import AppBar from "../../AppBar/AppBar";

const TabBar = ({ activeTab, title, hideTabsBar = false, children, handleTab }) => {

  const handlerTab = (tabId) => {
    if (!tabId) return;
    if (!handleTab) return;
    handleTab(tabId);
  };

  return (
    <AppBar title={title} hideTabsBar={hideTabsBar}>
      {activeTab && <ul className="app-bar__tabs">
        {children.map((child) => {
          const { tabId = "default", tabLabel = "default" } = child.props;
          return (
            <Tab
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
