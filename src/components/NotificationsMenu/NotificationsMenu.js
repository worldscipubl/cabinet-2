import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames";
import ListNotifications from "../ListNotifications";
import IonIcon from "../IonIcon";
import {useLazyGetNotificationsQuery} from "../../api/endpoints/NotificationsApi";
import cn from "./NotificationsMenu.module.scss";
import DialogHeader from "../DialogHeader";

const NotificationsMenu = ({open, setOpen}) => {
    const [trigger, {data, error, isLoading}] = useLazyGetNotificationsQuery();
    const history = useHistory();

    useEffect(() => {
        if (open && trigger) trigger();
    }, [open]);

    function handleShowHistory() {
        history.push("/notifications");
        setOpen && setOpen(false);
    }

    function handleClose() {
        setOpen?.(false);
    }

    return (
        <div className={classNames(cn.Container)}>
            <DialogHeader className={classNames(cn.Header)}
                          label="Последние уведомления" handleClose={handleClose}/>
            <div className={classNames(cn.List)}>
                <ListNotifications isLoading={isLoading} error={error} data={data}/>
            </div>
            <button className={classNames(cn.ShowHistoryBtn, "link")} onClick={handleShowHistory}>
                Перейти к истории уведомлений
            </button>
        </div>
    );
};


export default NotificationsMenu;
