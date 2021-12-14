import React from "react";
import Footer from "../../components/Footer";
import NavMenu from "../../components/NavMenu";
import AppBar from "../AppBar/AppBar";

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
          <div className="app__inner">
            {children}
          </div>
        </main>
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
