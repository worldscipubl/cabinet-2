import React from "react";
import "./LogoBanner.scss";
import Logo from "../../common/images/logo/logo_black.svg";

const LogoBanner = (props) => {
  const linkBanner = {
    to: "https://www.worldscipubl.com/",
    title: "www.worldscipubl.com",
  };

  return (
    <div className="logo-banner">
      <img className="logo-banner__img" src={Logo} alt="World Sci Publ" />
      <a
        className="logo-banner__link link"
        href={linkBanner.to}
        rel="noreferrer"
        target="_blank"
      >
        {linkBanner.title}
      </a>
    </div>
  );
};

export default LogoBanner;
