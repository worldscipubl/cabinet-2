import React from "react";
import classNames from "classnames";
import IonIcon from "../IonIcon";
import cn from "./Avatar.module.scss";

export const Avatar = ({className, avatar, onClick, ...props}) => {

    return (
        <div className={classNames(cn.Wrapper, className)} onClick={onClick}>
            {avatar ?
                <img className={classNames(cn.Img, cn.border)}
                     src={avatar} alt="avatar"/> :
                <IonIcon className={classNames(cn.Img)} name="person-circle-outline"/>}
        </div>
    );
};

export default Avatar;
