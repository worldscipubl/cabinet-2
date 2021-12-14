import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import "./Header.scss";
import Avatar from "../Avatar";
import IonIcon from "../IonIcon";

const Header = () => {
  const history = useHistory();

  return (
    <header className="app__header header">
      <div className="header__inner">
        <HeaderLogo />
        <ul className="header__action">
          <li className="header__action-item">
            <NavLink className="bell" to="/notifications">
              <IonIcon className="bell__img" name="notifications" />
            </NavLink>
          </li>
          <li className="header__action-item">
            <Avatar size="small" type="button" border="primary" onClick={() => {
              localStorage.removeItem("user_token");
              history.push("/");
            }} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
