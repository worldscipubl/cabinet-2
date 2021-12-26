import React, { useRef, useState } from "react";
import HeaderLogo from "./HeaderLogo";
import Avatar from "../Avatar";
import IonIcon from "../IonIcon";
import DropDownHeaderMenu from "../DropDownHeaderMenu";
import NotificationsMenu from "../NotificationsMenu";
import ProfileMenu from "../ProfileMenu";
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
          <li className="header__action-item" ref={bellRef} onClick={handleBell}>
            <div className="bell">
              <IonIcon className="bell__img" name="notifications" />
            </div>
          </li>
          <li className="header__action-item" ref={profileRef} onClick={handleProfile}>
            <Avatar size="small" type="button" border="primary" />
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
        <ProfileMenu open={openProfile} setOpen={setOpenProfile} />
      </DropDownHeaderMenu>
    </header>
  );
};

export default Header;
