const TabContent = ({ activeTab, children }) => {
  if (!Array.isArray(children)) return children;
  const tab = children.filter((child) => child.props.tabId === activeTab);

  return tab.length ? tab : children[0];
};

export default TabContent;
