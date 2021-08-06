import React from "react";
import "./NavMenu.scss";
import { AccordionMenu } from "../AccordionMenu/AccordionMenu";
import AccordionItem from "../AccordionMenu/AccordionItem/AccordionItem";
import myArticlesImg from "../../common/images/nav-menu/my_articles.svg";
import faqImg from "../../common/images/nav-menu/faq.svg";
import loyaltyImg from "../../common/images/nav-menu/loyalty.svg";
import profileImg from "../../common/images/nav-menu/profile.svg";

export const NavMenu = () => {
  const navMenuList = [
    {
      img: myArticlesImg,
      title: "Мои статьи",
      linkTo: "/my-articles",
      id: "my-articles",
    },
    {
      img: loyaltyImg,
      title: "Программа лояльности",
      linkTo: "/loyalty",
      id: "loyalty",
    },
    { img: profileImg, title: "Профиль", linkTo: "/profile", id: "profile" },
    { img: faqImg, title: "FAQ", linkTo: "/faq", id: "faq" },
  ];

  return (
    <nav className="app__aside-menu menu">
      <div className="menu__inner">
        <AccordionMenu>
          {navMenuList.map(({ img, title, linkTo, id }) => (
            <AccordionItem img={img} title={title} linkTo={linkTo} id={id}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                adipisci, asperiores corporis dolor dolorem dolores ducimus iste
                laborum laudantium magnam obcaecati officia placeat quia ratione
                repellendus sed sequi tempore, vel!
              </p>
            </AccordionItem>
          ))}
        </AccordionMenu>
      </div>
    </nav>
  );
};
