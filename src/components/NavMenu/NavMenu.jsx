import React from "react";
import "./NavMenu.scss";
import { AccordionMenu } from "../AccordionMenu/AccordionMenu";
import AccordionMenuItem from "../AccordionMenu/AccordionMenuItem/AccordionMenuItem";
import myArticlesImg from "../../common/images/nav-menu/my_articles.svg";
import faqImg from "../../common/images/nav-menu/faq.svg";
import loyaltyImg from "../../common/images/nav-menu/loyalty.svg";
import profileImg from "../../common/images/nav-menu/profile.svg";
import chatImg from "../../common/images/nav-menu/chat.svg";
import { Link } from "react-router-dom";
import clientImg from "../../common/images/illustrations/client.svg";

export const NavMenu = () => {
  const navMenuList = [
    {
      img: myArticlesImg,
      title: "Мои статьи",
      linkTo: "/article",
      id: "article",
    },
    {
      img: loyaltyImg,
      title: "Партнерка",
      linkTo: "/loyalty",
      id: "loyalty",
    },
    { img: profileImg, title: "Профиль", linkTo: "/profile", id: "profile" },
    { img: chatImg, title: "Чат", linkTo: "/chat", id: "chat" },
    { img: faqImg, title: "FAQ", linkTo: "/faq", id: "faq" },
  ];

  return (
    <nav className="app__aside-menu menu">
      <div className="menu__inner">
        <AccordionMenu>
          {navMenuList.map(({ img, title, linkTo, id }) => (
            <AccordionMenuItem
              key={id}
              img={img}
              title={title}
              linkTo={linkTo}
              id={id}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                adipisci, asperiores corporis dolor dolorem dolores ducimus iste
                laborum laudantium magnam obcaecati officia placeat quia ratione
                repellendus sed sequi tempore, vel!
              </p>
            </AccordionMenuItem>
          ))}
        </AccordionMenu>
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
