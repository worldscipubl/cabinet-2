import React from 'react';
import classNames from "classnames";
import IonIcon from "../IonIcon";
import cn from "./DialogHeader.module.scss"

const DialogHeader = ({className, label, handleClose}) => {
    function handleCloseBtn(e) {
        e.preventDefault();
        handleClose?.();
    }

    return (
        <div className={classNames(cn.Header, className)}>
            <p className="text text_weight_bold">
                {label}
            </p>
            <IonIcon className={classNames(cn.CloseBtn)} name="close" onClick={handleCloseBtn}/>
        </div>
    );
};

export default DialogHeader;