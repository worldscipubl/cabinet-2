import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import TabBar from "./TabBar";

const TabLayout = ({ children, defaultTabs, article, archive }) => {
  const [activeTab, setActiveTab] = useState(
    getActiveTabDefault(children, defaultTabs)
  );

  useEffect(() => {
    setActiveTab(getActiveTabDefault(children, defaultTabs));
  }, [children, defaultTabs]);

  return (
    <>
      <TabBar activeTab={activeTab} handleTab={setActiveTab} article={article} archive={archive}>
        {children}
      </TabBar>
      <TabContent activeTab={activeTab}>{children}</TabContent>
    </>
  );
};

const getActiveTabDefault = (children, defaultTabs) => {
  if (!Array.isArray(children)) return;

  if (defaultTabs) return defaultTabs;

  return children[0].props.tabId || "default";
};

export default TabLayout;
