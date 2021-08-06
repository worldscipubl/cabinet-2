import React from "react";
import "./BurgerBtn.scss";

export const BurgerBtn = () => {
  const style = `burger js-burger`;
  return (
    <div className="header__burger">
      <button className={style}>
        <span className="burger__item"></span>
        <span className="burger__item"></span>
        <span className="burger__item"></span>
      </button>
    </div>
  );
};
