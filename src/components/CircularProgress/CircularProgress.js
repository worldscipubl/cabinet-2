import React from 'react';
import classNames from "classnames";
import cn from "./CircularProgress.module.scss"

const CircularProgress = ({className, children, isLoading}) => {

    if (!isLoading) return children;

    return (
        <div className={classNames(cn.Wrapper, className)}>
            <span className={classNames(cn.Progress)} role="progressbar">
                <svg className={classNames(cn.Circular)} viewBox="22 22 44 44">
                    <circle className={classNames(cn.CircularInner)}
                            cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"/>
                </svg>
            </span>
            {children}
        </div>
    );
};

export default CircularProgress;