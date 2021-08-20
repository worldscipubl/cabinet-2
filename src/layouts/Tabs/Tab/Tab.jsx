import React from "react";
import PropTypes from "prop-types";

const Tab = ({ activeTab, label, onClick }) => {
  const className = activeTab === label ? "active" : "";

  return (
    <li
      className={"tabs__item button button_type_tabs " + className}
      onClick={() => {
        onClick(label);
      }}
    >
      {label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
