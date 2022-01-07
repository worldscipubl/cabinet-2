import React from 'react';
import classNames from "classnames";
import Avatar from "../Avatar";
import cn from "./FieldAvatar.module.scss"

const FieldAvatar = ({className}) => {
    return (
        <div className={classNames(cn.Wrapper, className)}>
            <Avatar className={classNames(cn.Avatar)}/>
            <button className={classNames("button button_type_tabs", cn.UploadBtn)}>
                Изменить фото
            </button>
        </div>
    );
};

export default FieldAvatar;
