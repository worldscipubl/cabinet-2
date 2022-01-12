import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import CardItem from "./CardItem";
import IonIcon from "../IonIcon";
import EmptyState from "../../domain/EmptyState";
import DialogAddCard from "../DialogAddCard";
import CircularProgress from "../CircularProgress";
import {useDeleteWalletMutation, useGetWalletsQuery} from "../../api/endpoints/WalletsApi";
import cn from "./CardList.module.scss"

const CardList = ({children}) => {
    const {data, error, isLoading} = useGetWalletsQuery();
    const [deleteWallet, {}] = useDeleteWalletMutation();
    const [showDialog, setShowDialog] = useState(false);
    const [isLoadingCards, setLoadingCards] = useState(false);

    function handleAddCard(e) {
        e.preventDefault();
        setShowDialog(true);
    }

    function handleTrashCard(id) {
        setLoadingCards(true);
        deleteWallet(id).unwrap()
            .catch((error) => {
                setLoadingCards(false);
                console.log(error);
            });
    }

    useEffect(() => setLoadingCards(false), [data]);

    if (isLoading) return (
        <div className={classNames(cn.Wrapper)}>
            {[1, 2, 3].map((id) => (
                <CardItem key={id} isLoading/>
            ))}
        </div>
    )

    if (error) return (
        <EmptyState
            className={classNames(cn.EmptyState)}
            type="warning"
            title="Упс... Произошла ошибка!"
            description={error}/>
    );

    if (!data?.length) return (
        <EmptyState
            className={classNames(cn.EmptyState)}
            title="Карт пока нет"
            imgName="no_data"
            description="Тут будет список ваших карт">
            <button className="button button_type_main" onClick={handleAddCard}>
                Добавить карту
            </button>
            <DialogAddCard open={showDialog} setOpen={setShowDialog}/>
        </EmptyState>
    );
    return (
        <div className={classNames(cn.Wrapper, {[cn.isLoading]: isLoadingCards})}>
            {
                data.map(({id, name, value}) => (
                    <CardItem id={id} name={name} value={value} key={id}
                              handleTrashCard={handleTrashCard}/>
                ))
            }
            <div className={classNames(cn.WrapperAddBtn)}>
                <div className={classNames(cn.AddBtn)} onClick={handleAddCard}>
                    <IonIcon className={classNames(cn.AddImg)} name="add-outline"/>
                    <span className={classNames(cn.AddLabel, "text text_color_gray")}>
                    Добавить карту
                </span>
                </div>
            </div>
            <DialogAddCard open={showDialog} setOpen={setShowDialog}/>
            <CircularProgress className={classNames(cn.Progress)} isLoading={isLoadingCards}/>
        </div>
    );
};

export default CardList;