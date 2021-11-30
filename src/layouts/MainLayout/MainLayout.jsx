import React from "react";
import Footer from "../../components/Footer";
import NavMenu from "../../components/NavMenu";

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
