import React from 'react';
import classNames from "classnames";
import cn from "./DialogBody.module.scss";
import CircularProgress from "../CircularProgress";

const DialogBody = ({className, children, isLoading}) => {
    return (

        <div className={classNames(cn.Wrapper, className, {[cn.isLoading]: isLoading})}>
            {children}
            {isLoading &&
                <CircularProgress className={classNames(cn.Progress)} isLoading={isLoading}/>}
        </div>
    );
};

export default DialogBody;