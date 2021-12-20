import React, { useRef, useState } from "react";
import classNames from "classnames";
import HeaderLogo from "./HeaderLogo";
import Avatar from "../Avatar";
import IonIcon from "../IonIcon";
import DropDownHeaderMenu from "../DropDownHeaderMenu";
import NotificationsMenu from "../NotificationsMenu";
import "./Header.scss";

const Header = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const bellRef = useRef();
  const profileRef = useRef();

  function handleBell() {
    setOpenNotification(prevState => !prevState);
    setOpenProfile(false);
  }

  function handleProfile() {
    setOpenProfile(prevState => !prevState);
    setOpenNotification(false);
  }

  return (
    <header className="app__header header">
      <div className="header__inner">
        <HeaderLogo />
        <ul className="header__action">
          <li className="header__action-item" ref={bellRef}>
            <div className="bell">
              <IonIcon className="bell__img" name="notifications" onClick={handleBell} />
            </div>
          </li>
          <li className="header__action-item" ref={profileRef}>
            <Avatar size="small" type="button" border="primary" onClick={handleProfile} />
            <span className="text header__username">Иван</span>
          </li>
        </ul>
      </div>
      <DropDownHeaderMenu className="header-menu__notification"
                          open={openNotification} setOpen={setOpenNotification}
                          anchorEl={bellRef}>
        <NotificationsMenu open={openNotification} setOpen={setOpenNotification} />
      </DropDownHeaderMenu>
      <DropDownHeaderMenu className="header-menu__profile"
                          open={openProfile} setOpen={setOpenProfile} anchorEl={profileRef}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
      </DropDownHeaderMenu>
    </header>
  );
};

export default Header;
