import React from "react";
import "./Avatar.scss";

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

export const Avatar = (props) => {
  const style = initStyleAvatar(props);

  return (
    <div className={style}>
      <img
        className="avatar__img"
        src="https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
