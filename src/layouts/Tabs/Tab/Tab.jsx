import React from "react";
import PropTypes from "prop-types";

const Tab = ({ id, activeTab, label, onClick }) => {
  const className = activeTab === id ? "active" : "";

  return (
    <li
      className={"tabs__item button button_type_tabs " + className}
      onClick={() => {
        onClick(id);
      }}
    >
      {label}
    </li>
  );
};

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
