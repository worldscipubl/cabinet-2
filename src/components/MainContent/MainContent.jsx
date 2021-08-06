import React from "react";
import { NavMenu } from "../NavMenu/NavMenu";
import { Footer } from "../Footer/Footer";

export const MainContent = ({ children, hideMenu, hideFooter }) => {
    return (
        <div className="app__body">
            {hideMenu || <NavMenu />}
            <div className="app__content">
                <div className="app__inner">
                    <main className="app__main">{children}</main>
                    {hideFooter || <Footer />}
                </div>
            </div>
        </div>
    );
};
