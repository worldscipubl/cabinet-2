import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./AuthorTabBtn.module.scss";

const AuthorTabBtn = ({ id, activeTab, label, onClick }) => {
  return (
    <li
      className={classNames(cn.Tab, "button button_type_tabs", {
        active: activeTab === id,
      })}
      onClick={() => {
        onClick(id);
      }}
    >
      {label}
    </li>
  );
};

AuthorTabBtn.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthorTabBtn;
