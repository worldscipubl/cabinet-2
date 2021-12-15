import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import btnImg from "../../common/images/icons/arrow-back.svg";
import cn from "./AppBar.module.scss";

const AppBar = ({ title }) => {
  const location = useLocation();

  return (
    <header className={classNames(cn.AppBar)}>
      <ul className={classNames(cn.AppBarList)}>
        {!["/home", "/"].includes(location.pathname) && (
          <li className={classNames(cn.Action, cn.ActionBack)}>
            <Link to="/">
              <img className={classNames(cn.ActionBackImg)} src={btnImg} alt="back" />
            </Link>
          </li>
        )}
        <li className={classNames(cn.Action)}>
          <h2 className={classNames(cn.AppBarTitle, "text text_color_gray-blue")}>
            {title || "Заголовок не указан"}
          </h2>
        </li>
      </ul>
    </header>
  );
};

AppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default AppBar;
