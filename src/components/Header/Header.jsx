import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import couponImg from "../../common/images/icons/coupon.svg";
import HeaderLogo from "./HeaderLogo";
import "./Header.scss";
import Avatar from "../Avatar";
import IonIcon from "../IonIcon";

const Header = () => {
  const history = useHistory();
  const style = `app__header header`;

  return (
    <header className={style}>
      <div className="header__inner">
        <HeaderLogo />
        <ul className="header__action">
          <li className="header__action-item">
            <NavLink className="amounts" to="/notifications">
              <IonIcon className="amounts__item" name="notifications" size="large" />
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
