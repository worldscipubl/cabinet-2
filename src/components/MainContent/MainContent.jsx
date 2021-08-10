import React from "react";
import { NavMenu } from "../NavMenu/NavMenu";
import { Footer } from "../Footer/Footer";
import AppBar from "../AppBar/AppBar";

export const MainContent = ({ children, hideMenu, hideFooter, title }) => {
  return (
    <div className="app__body">
      {hideMenu || <NavMenu />}
      <div className="app__content">
        <AppBar title={title}/>
        <main className="app__main">{children}</main>
        {hideFooter || <Footer />}
      </div>
    </div>
  );
};
