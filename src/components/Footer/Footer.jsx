import React from "react";
import "./Footer.scss";
import Copyright from "../Copyright/Copyright";

export const Footer = () => {
  const style = `app__footer footer`;

  return (
    <footer className={style}>
      <Copyright />
    </footer>
  );
};
