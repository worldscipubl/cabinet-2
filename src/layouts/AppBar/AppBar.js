import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import classNames from "classnames";
import btnImg from "../../common/images/icons/arrow-back.svg";
import cn from "./AppBar.module.scss";

const   AppBar = ({ title, description }) => {
  const location = useLocation();
  const history = useHistory();

  const handlerHistory = () => {
    if (location.pathname.includes('/article/')) {
      history.push('/articles')
    } else {
      history.push('/')
    }
  }

  return (
    <header className={classNames(cn.AppBar)}>
      <ul className={classNames(cn.AppBarList)}>
        {!["/home", "/"].includes(location.pathname) && (
          <li
            className={classNames(cn.Action, cn.ActionBack)}
            // onClick={() => history.goBack()}
            onClick={handlerHistory}
          >
            <img
              className={classNames(cn.ActionBackImg)}
              src={btnImg}
              alt="back"
            />
          </li>
        )}
        <li className={classNames(cn.Action)}>
          <h2
            className={classNames(cn.AppBarTitle, "text text_color_gray-blue")}
          >
            {title || "Заголовок не указан"}
          </h2>
        </li>
      </ul>
      <h2
        className={classNames(
          cn.AppBarDescription,
          "text text_size_default text_color_gray"
        )}
      >
        {description || ""}
      </h2>
    </header>
  );
};

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppBar;
