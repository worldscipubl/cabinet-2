import React from "react";
import TabButton from "../TabButton";
import classNames from "classnames";
import cn from "./TabBar.module.scss";

const TabBar = ({ className, activeTab, children, handleTab }) => {
  const handlerTab = (tabId) => {
    if (!tabId) return;
    if (!handleTab) return;
    handleTab(tabId);
  };

  return (
    <div className={classNames(cn.TabBar)}>
      {activeTab && (
        <ul className={classNames(cn.TabBarTabs, className)}>
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
        </ul>
      )}
    </div>
  );
};

export default TabBar;
