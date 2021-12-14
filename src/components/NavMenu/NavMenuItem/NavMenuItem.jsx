import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenuItem.scss";
import IonIcon from "../../IonIcon";

const NavMenuItem = ({ img, title, linkTo, onClick }) => {
  return (
    <NavLink
      className="nav-menu__item"
      activeClassName="show"
      to={linkTo}
      onClick={onClick}
    >
      <IonIcon className="nav-menu__img" name={img} alt="icon" />
      <h3 className="nav-menu__title text text_size_accent">{title}</h3>
    </NavLink>
  );
};

export default NavMenuItem;
