import React from "react";
import { NavLink } from "react-router-dom";
import IonIcon from "../../IonIcon";
import withBadge from "../../../hoc/withBadge";
import "./NavMenuItem.scss";

const NavMenuItem = ({ img, title, linkTo, onClick, useBadgeId }) => {
  const [badgeId, setBadgeId] = useBadgeId();

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

export default withBadge(NavMenuItem,
  {
    anchorOrigin: { horizontal: "left", vertical: "center" },
    className: "nav-menu__badge-wrapper",
    classesBadge: "nav-menu__badge"
  });


