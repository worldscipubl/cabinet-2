import React from "react";
import Footer from "../../components/Footer";
import NavMenu from "../../components/NavMenu";
import AppBar from "../AppBar/AppBar";
import { Link } from "react-router-dom";
import btnImg from "../../common/images/icons/arrow-back.svg";
import menuImg from "../../common/images/icons/dots-menu.svg";

const MainLayout = ({
                      children,
                      hideMenu,
                      hideFooter
                    }) => {

  return (
    <div className="app__body">
      {!hideMenu && <NavMenu />}
      <div className="app__content">
        <main className="app__main">
          {children}
        </main>
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
