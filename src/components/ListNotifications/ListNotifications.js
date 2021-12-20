import React from "react";
import classNames from "classnames";
import EmptyState from "../../domain/EmptyState";
import NotificationItem from "../NotificationItem";
import Spinner from "../Spinner";
import cn from "./ListNotifications.module.scss";

const ListNotifications = ({ isLoading, wrapper, error, data, spinner = false }) => {
  if (isLoading) return spinner ? <Spinner /> : <SkeletonNotification isLoading={true} />;

  if (error) return (
    <EmptyState
      fullScreen={true}
      type="warning"
      title="Упс... Произошла ошибка!"
      description={error} />
  );

  if (!data?.length) return (
    <EmptyState
      title="Уведомлений пока нет"
      description="Тут будет отображаться список ваших уведомлений" />
  );
  return data.map((item) => (
    <NotificationItem className={classNames(cn.ItemContent)} {...item} />
  ));
};

function SkeletonNotification({ isLoading }) {
  return [0, 1, 2, 3, 4].map((id) => (
    <NotificationItem className={classNames(cn.ItemContent)} isLoadingItem={isLoading} key={id} />
  ));
}

export default ListNotifications;
