import React, { useState } from "react";
import "./BreadCrumbs.scss";

export const BreadCrumbs = () => {
  const style = `breadcrumbs`;

  return (
    <div className={style}>
      <div className="breadcrumbs__inner">
        <span className="breadcrumbs__item">
          <a
            className="breadcrumbs__link text text_type_link text_color_gray-blue"
            href="#"
          >
            <span itemProp="name">/ Все статьи</span>
          </a>
        </span>
        <span className="breadcrumbs__item">
          <span className="text text_color_gray-blue"> / </span>
        </span>
        <span className="breadcrumbs__item">
          <a className="breadcrumbs__link text text_type_link text_color_gray-blue">
            <span>Без рубрики</span>
          </a>
        </span>
      </div>
    </div>
  );
};
