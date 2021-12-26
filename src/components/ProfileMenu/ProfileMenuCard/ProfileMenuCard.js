import React from "react";
import classNames from "classnames";
import Avatar from "../../Avatar";
import IonIcon from "../../IonIcon";
import cn from "./ProfileMenuCard.module.scss";
import ProfileMenuOptions from "../ProfileMenuOptions";

const ProfileMenuCard = ({ className, handleSelect }) => {
  return (
    <div className={classNames(cn.Wrapper, className)}>
      <div className={classNames(cn.Profile)}>
        <Avatar className={classNames(cn.ProfileAvatar)} size="small" type="button" border="primary" />
        <div className={classNames(cn.ProfileAbout)}>
          <p className={classNames(cn.ProfileItem, "text")}>Иван Петрович</p>
          <p className={classNames(cn.ProfileItem, "text")}>ivan@mail.com</p>
        </div>
        <IonIcon className={classNames(cn.ProfileArrow)} name="chevron-forward-outline" />
      </div>
      <ProfileMenuOptions handleSelect={handleSelect} />
    </div>
  );
};

export default ProfileMenuCard;
