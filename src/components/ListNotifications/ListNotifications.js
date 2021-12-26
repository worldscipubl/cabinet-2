import React from "react";
import classNames from "classnames";
import EmptyState from "../../domain/EmptyState";
import NotificationItem from "../NotificationItem";
import Spinner from "../Spinner";
import cn from "./ListNotifications.module.scss";

const ListNotifications = ({ isLoading, wrapper, error, data, spinner = false }) => {
  if (isLoading) return spinner ? <Spinner /> : <SkeletonNotification />;

  if (error) return (
    <EmptyState
      fullScreen={true}
      type="warning"
      title="Упс... Произошла ошибка!"
      description={error} />
  );

  if (!data?.length) return (
    <EmptyState
      title="У вас пока нет уведомлений"
      description="Тут будет отображаться список ваших уведомлений" />
  );
  return data.map((item, index) => (
    <NotificationItem className={classNames(cn.ItemContent)} {...item} key={item?.id || index} />
  ));
};

function SkeletonNotification() {
  return [0, 1, 2, 3, 4].map((id) => (
    <NotificationItem className={classNames(cn.ItemContent)} isLoadingItem={true} key={id} />
  ));
}

export default ListNotifications;
