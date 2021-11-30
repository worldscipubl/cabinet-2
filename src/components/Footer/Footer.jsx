import React from "react";
import "./Footer.scss";
import Copyright from "../Copyright/Copyright";

const Footer = () => {
  const style = `app__footer footer`;

  return (
    <footer className={style}>
      <Copyright />
    </footer>
  );
};

export default Footer;
