import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AppBar.scss";
import btnImg from "../../common/images/icons/arrow-back.svg";
import menuImg from "../../common/images/icons/dots-menu.svg";

const AppBar = ({ title, hideTabsBar, children }) => {
  const location = useLocation();

  return (
    <header className="app-bar">
      <ul className="app-bar__actions">
        {!["/article", "/"].includes(location.pathname) && (
          <li className="app-bar__action app-bar__action_back">
            <Link to="/">
              <img className="app-bar__back-btn" src={btnImg} alt="back" />
            </Link>
          </li>
        )}
        <li className="app-bar__action app-bar__action__title">
          <h2 className="app-bar-title text text_size_subtitle text_weight_bold text_color_gray-blue">
            {title || "Заголовок не указан"}
          </h2>
        </li>
        <li className="app-bar__action app-bar__action_other">
          <img className="app-bar__back-btn" src={menuImg} alt="back" />
        </li>
      </ul>
      {!hideTabsBar && children}
    </header>
  );
};

export default AppBar;
