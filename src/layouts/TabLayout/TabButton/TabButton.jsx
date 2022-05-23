import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./TabButton.module.scss";

const TabButton = ({ className, id, activeTab, label, onClick, article, archive }) => {

    if ( article && ((article.statusId < 4 && label === "Договор") || (article.statusId < 9 && label === "Оплата") || archive === 0)) {
      return null
    } else {
      return (
        <li
          className={classNames(cn.Tab, "button button_type_tabs", className, {
            active: activeTab === id,
          })}
          onClick={() => {
            onClick(id);
          }}
        >
          {label}
        </li>
      );


    }




  // return (
  //   <li
  //     className={classNames(cn.Tab, "button button_type_tabs", className, {
  //       active: activeTab === id,
  //     })}
  //     onClick={() => {
  //       onClick(id);
  //     }}
  //   >
  //     {label}
  //   </li>
  // );
};

TabButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabButton;
