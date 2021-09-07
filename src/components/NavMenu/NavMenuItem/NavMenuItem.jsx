import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenuItem.scss";

const NavMenuItem = ({ img, title, linkTo, onClick }) => {
  return (
    <NavLink
      className="nav-menu__item"
      activeClassName="show"
      to={linkTo}
      onClick={onClick}
    >
      <img className="nav-menu__img" src={img} alt="icon" />
      <h3 className="nav-menu__title text text_size_accent">{title}</h3>
    </NavLink>
  );
};

export default NavMenuItem;
