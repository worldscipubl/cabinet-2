import React from 'react';
import classNames from "classnames";
import cn from "./ItemCategory.module.scss"

const ItemCategory = ({className, title, children}) => {
    return (
        <div className={classNames(className, cn.Wrapper)}>
            <h3 className={classNames("text text_weight_bold text_size_accent", cn.Title)}>
                {title}
            </h3>
            {children}
        </div>
    );
};

export default ItemCategory;
