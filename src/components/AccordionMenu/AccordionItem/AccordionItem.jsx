import React from "react";
import { NavLink } from "react-router-dom";

export const AccordionItem = ({
  img,
  title,
  linkTo,
  id,
  onClick,
  open,
  children,
}) => {
  return (
    <div className="accordion-menu__item">
      <NavLink
        className="accordion-menu__header"
        activeClassName="show"
        to={linkTo}
        onClick={onClick}
      >
        <img className="accordion-menu__img" src={img} alt="icon" />
        <h3 className="accordion-menu__title text text_size_accent">{title}</h3>
      </NavLink>
      <div className={`accordion-menu__content ${open ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
