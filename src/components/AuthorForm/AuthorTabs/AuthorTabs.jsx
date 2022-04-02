import React, { useEffect, useState } from "react";
import classNames from "classnames";
import cn from "./AuthorTabs.module.scss";
import AuthorTabBtn from "../AuthorTabBtn";

const AuthorTabs = ({
  children,
  handlers: { handlerAddTab } = {},
  options: { isExtensible, tabsLimit } = {},
}) => {
  if (!Array.isArray(children)) children = React.Children.toArray(children);
  const [activeTab, setActiveTab] = useState(children[0].props?.label);
  const [tabs, setTabs] = useState(children);

  const getTabs = () => {
    return tabs.map((child) => {
      const { label } = child.props;

      return (
        <AuthorTabBtn
          activeTab={activeTab}
          key={label}
          label={label}
          id={label}
          onClick={(tab) => setActiveTab(tab)}
        />
      );
    });
  };
  const onClickAddTab = () => {
    if (!handlerAddTab) return;
    const newTab = handlerAddTab({ tabs });
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.props.label);
  };
  const getNewTabBtn = () => {
    if (!isExtensible || tabs.length >= tabsLimit) return;
    return (
      <AuthorTabBtn
        activeTab={activeTab}
        key="add-tab-btn"
        label="Добавить автора"
        id="add-tab-btn"
        onClick={onClickAddTab}
      />
    );
  };

  useEffect(() => {
    setTabs(children);
  }, [children]);

  return (
    <div className={classNames(cn.Container)}>
      <ul className={classNames(cn.TabBar)}>
        {getTabs()} {getNewTabBtn()}
      </ul>
      <section className={classNames(cn.Content)}>
        {tabs.filter((child) => child.props.label === activeTab)}
      </section>
    </div>
  );
};

export default AuthorTabs;
