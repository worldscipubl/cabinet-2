import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import couponImg from "../../common/images/icons/coupon.svg";
import HeaderLogo from "./HeaderLogo";
import "./Header.scss";
import Avatar from "../Avatar";

const Header = () => {
  const history = useHistory();
  const style = `app__header header`;

  return (
    <header className={style}>
      <div className="header__inner">
        <HeaderLogo />
        <ul className="header__action">
          <li className="header__action-item">
            <NavLink className="amounts" to="/">
              <div className="amounts__item">
                <img className="amounts__img" src={couponImg} alt="coupon" />
              </div>
              <div className="amounts__item amount">
                <h3
                  className="text text_size_text
                                            text_weight_bold text_color_black
                                            amount__title"
                >
                  ₽6000
                </h3>
                <p className="amount__status text">На счету</p>
              </div>
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
