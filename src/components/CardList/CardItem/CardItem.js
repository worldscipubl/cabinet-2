import React from 'react';
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import IonIcon from "../../IonIcon";
import cn from "./CardItem.module.scss";

const CardItem = ({className, id, name, value, isLoading, handleTrashCard}) => {

    function handleTrash(e) {
        e.preventDefault();
        handleTrashCard?.(id);
    }

    return (
        <div className={classNames(cn.Wrapper, className, {[cn.isLoading]: isLoading})}>
            {isLoading ?
                <Skeleton containerClassName={classNames(cn.Skeleton)}/> :
                <span className={classNames(cn.CardName, "text")}>
                    {name || "Данных нет"}
                </span>
            }
            <IonIcon className={classNames(cn.ImgCard)} name="card-outline"/>
            {isLoading ?
                <Skeleton containerClassName={classNames(cn.Skeleton)}/> :
                <span className={classNames(cn.CardNumber, "text text_color_gray")}>
                    {value || "Данных нет"}
                </span>
            }
            <IonIcon className={classNames(cn.ImgTrash)} name="close-circle-outline" onClick={handleTrash}/>
        </div>
    );
};

export default CardItem;