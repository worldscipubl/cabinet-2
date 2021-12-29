import React from "react";
import { Link } from "react-router-dom";
import clientImg from "../../common/images/illustrations/client.svg";
import NavMenuItem from "./NavMenuItem/NavMenuItem";
import "./NavMenu.scss";

const NavMenu = () => {
  const navMenuList = [
    { img: "home-outline", title: "Главная", linkTo: "/home", id: "home" },
    {
      img: "albums-outline",
      title: "Мои статьи",
      linkTo: "/articles",
      id: "article"
    },
    {
      img: "gift-outline",
      title: "Партнерка",
      linkTo: "/referral",
      id: "referral"
    },
    { img: "school-outline", title: "Обучение", linkTo: "/education", id: "school" }
  ];

  return (
    <nav className="app__aside-menu menu">
      <div className="menu__inner">
        {navMenuList.map(({ img, title, linkTo, id }) => (
          <NavMenuItem key={id} img={img} title={title} linkTo={linkTo} />
        ))}
      </div>
      <div className="menu__bottom">
        <img className="menu__bottom-img" src={clientImg} alt="client" />
        <Link className="button button_type_main menu__bottom-btn" to="/faq">
          FAQ
        </Link>
      </div>
    </nav>
  );
};

export default NavMenu;
