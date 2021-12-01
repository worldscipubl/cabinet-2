import React from "react";
import { Link } from "react-router-dom";
import myArticlesImg from "../../common/images/nav-menu/my_articles.svg";
import loyaltyImg from "../../common/images/nav-menu/loyalty.svg";
import profileImg from "../../common/images/nav-menu/profile.svg";
import chatImg from "../../common/images/nav-menu/chat.svg";
import clientImg from "../../common/images/illustrations/client.svg";
import NavMenuItem from "./NavMenuItem/NavMenuItem";
import "./NavMenu.scss";

const NavMenu = () => {
  const navMenuList = [
    {
      img: myArticlesImg,
      title: "Мои статьи",
      linkTo: "/article",
      id: "article"
    },
    {
      img: loyaltyImg,
      title: "Партнерка",
      linkTo: "/referral",
      id: "referral"
    },
    { img: profileImg, title: "Профиль", linkTo: "/profile", id: "profile" },
    { img: chatImg, title: "Чат", linkTo: "/chat", id: "chat" }
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
