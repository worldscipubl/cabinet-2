import React from "react";
import classNames from "classnames";
import IonIcon from "../IonIcon";
import cn from "./Avatar.module.scss";
import CircularProgress from "../CircularProgress";

export const Avatar = ({ className, img, onClick, isLoading, ...props }) => {
  return (
    <CircularProgress isLoading={isLoading}>
      <div
        className={classNames(cn.Wrapper, className, {
          [cn.isLoading]: isLoading,
        })}
        onClick={onClick}
      >
        {img ? (
          <img
            className={classNames(cn.Img, cn.border)}
            src={img}
            alt="avatar"
          />
        ) : (
          <IonIcon
            className={classNames(cn.Img)}
            name="person-circle-outline"
          />
        )}
      </div>
    </CircularProgress>
  );
};

export default Avatar;
