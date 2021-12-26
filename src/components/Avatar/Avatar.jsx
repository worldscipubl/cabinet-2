import React from "react";
import classNames from "classnames";
import IonIcon from "../IonIcon";
import cn from "./Avatar.module.scss";

export const Avatar = ({ className, avatar, onClick, ...props }) => {

  return (
    <div className={classNames(cn.Wrapper)} onClick={onClick}>
      {avatar ? <img
        className={classNames(cn.Img, { [cn.border]: true })}
        src={avatar}
        alt="avatar"
      /> : <IonIcon className={classNames(cn.Img)} name="person-circle-outline" />}
    </div>
  );
};

const initStyleAvatar = ({ size, type, border }) => {
  let style = "avatar";

  if (size) {
    style += " avatar_size";
    switch (size) {
      case "stretchX":
        style += "_stretch-x";
        break;
      case "stretchY":
        style += "_stretch-y";
        break;
      case "small":
        style += "_small";
        break;
      case "large":
        style += "_large";
        break;
      default:
        break;
    }
  }

  if (type) {
    style += " avatar_type";
    switch (type) {
      case "button":
        style += "_btn";
        break;
      default:
        break;
    }
  }

  if (border) {
    style += " avatar_border";
    switch (border) {
      case "primary":
        style += "_primary";
        break;
      default:
        break;
    }
  }

  return style;
};

export default Avatar;
