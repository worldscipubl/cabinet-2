import React from "react";
import { NavLink } from "react-router-dom";

export const AccordionItem = (props) => {
  return (
    <div className="accordion-menu__item">
      <NavLink
        className="accordion-menu__header"
        activeClassName="show"
        to={props.linkTo}
        onClick={props.onClick}
      >
        <img className="accordion-menu__img" src={props.img} alt="icon"/>
        <h3 className="accordion-menu__title text text_size_accent">
          {props.title}
        </h3>
      </NavLink>
      <div className={`accordion-menu__content ${props.open ? "open" : ""}`}>
        {props.children}
      </div>
    </div>
  );
};

export default AccordionItem;
