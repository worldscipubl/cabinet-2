import React, { useState, useEffect } from "react";
import { NavMenu } from "../NavMenu/NavMenu";
import { Footer } from "../Footer/Footer";
import AppBar from "../../layouts/AppBar/AppBar";
import Tab from "../../layouts/Tabs/Tab/Tab";
import { useParams } from "react-router-dom";

const MainContent = ({
  children,
  hideMenu,
  hideTabsBar,
  hideFooter,
  title,
}) => {
  const { tabId: defaultTabs } = useParams();
  const showTabs = Array.isArray(children);
  const [activeTab, setActiveTab] = useState(
    getActiveTabDefault(children, defaultTabs)
  );
  const TabsBar = () => {
    if (!showTabs) return null;

    return (
      <ul className="app-bar__tabs">
        {children.map((child) => {
          const { tabId = "default", tabLabel = "default" } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              id={tabId}
              key={tabId}
              label={tabLabel}
              onClick={setActiveTab}
            />
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    setActiveTab(getActiveTabDefault(children, defaultTabs));
  }, [children]);

  return (
    <div className="app__body">
      {hideMenu || <NavMenu />}
      <div className="app__content">
        <AppBar title={title} hideTabsBar={hideTabsBar}>
          <TabsBar />
        </AppBar>
        <main className="app__main">{getTabContent(children, activeTab)}</main>
        {hideFooter || <Footer />}
      </div>
    </div>
  );
};

const getTabContent = (children, activeTab) => {
  if (!Array.isArray(children)) return children;
  const tab = children.filter((child) => child.props.tabId === activeTab);
  return tab.length ? tab : children[0];
};

const getActiveTabDefault = (children, defaultTabs) => {
  if (!Array.isArray(children)) return;

  if (defaultTabs) return defaultTabs;

  return children[0].props.tabId || "default";
};

export default MainContent;
