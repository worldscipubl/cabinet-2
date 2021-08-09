import React from "react";
import "./Header.scss";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import { BurgerBtn } from "../BurgerBtn/BurgerBtn";
import { Avatar } from "../Avatar/Avatar";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const style = `app__header header`;

  return (
    <header className={style}>
      <div className="header__inner">
        <BurgerBtn />
        <HeaderLogo />
        <ul className="header__action">
          <li className="header__action-item">
            <NavLink className="amounts" to="/">
              <div className="amounts__item">
                <img
                  className="amounts__img"
                  src="http://localhost/wsp_cab/public/images/icons/coupon.svg"
                  alt="coupon"
                />
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
            <Avatar size="small" type="button" border="primary" />
          </li>
        </ul>
      </div>
    </header>
  );
};
