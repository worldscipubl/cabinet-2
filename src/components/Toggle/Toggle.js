import React, {useEffect} from 'react';
import classNames from "classnames";
import cn from "./Toggle.module.scss";

const Toggle = ({className, label, value, setValue, isLoading}) => {
    function handleCheck(e) {
        e.preventDefault();
        setValue?.(prevState => !prevState);
    }

    return (
        <label className={classNames(cn.Wrapper, className)} onClick={handleCheck}>
            <div className={classNames(cn.Toggle, {[cn.loading]: isLoading})}>
                <input className={classNames(cn.Checkbox)} checked={value} onChange={e => e.preventDefault()}
                       type="checkbox"/>
                <span className={classNames(cn.Circle)}/>
            </div>
            {label && <span className={classNames(cn.Label)}>{label}</span>}
        </label>
    );
};

export default Toggle;
