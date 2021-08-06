import React from "react";
import "./HeaderLogo.scss";
import logoImg from "../../common/images/logo/logo_black.svg";
import { NavLink } from "react-router-dom";

export const HeaderLogo = () => {
  const style = `header__logo logo-header`;

  return (
    <NavLink className={style} to="/">
      <img
        className="logo-header__img"
        src={logoImg}
        alt="Logo: World Sci Publ"
      />
      <h3 className="logo-header__label text text_color_gray-blue text_weight_bold">
        Личный кабинет <br /> World Sci Publ
      </h3>
    </NavLink>
  );
};
