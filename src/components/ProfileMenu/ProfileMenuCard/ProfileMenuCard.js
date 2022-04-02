import React from "react";
import classNames from "classnames";
import Avatar from "../../Avatar";
import IonIcon from "../../IonIcon";
import ProfileMenuOptions from "../ProfileMenuOptions";
import { useGetUserQuery } from "../../../api/endpoints/UserApi";
import cn from "./ProfileMenuCard.module.scss";

const ProfileMenuCard = ({ className, handleSelect }) => {
  const { data } = useGetUserQuery();
  const { name, email, avatar } = data || {};

  return (
    <div className={classNames(cn.Wrapper, className)}>
      <div className={classNames(cn.Profile)}>
        <Avatar
          className={classNames(cn.ProfileAvatar)}
          img={avatar}
          size="small"
          type="button"
          border="primary"
        />
        <div className={classNames(cn.ProfileAbout)}>
          <p className={classNames(cn.ProfileItem, "text")}>{name}</p>
          <p className={classNames(cn.ProfileItem, "text")}>{email}</p>
        </div>
        <IonIcon
          className={classNames(cn.ProfileArrow)}
          name="chevron-forward-outline"
        />
      </div>
      <ProfileMenuOptions handleSelect={handleSelect} />
    </div>
  );
};

export default ProfileMenuCard;
