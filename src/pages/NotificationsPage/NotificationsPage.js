import React from "react";
import classNames from "classnames";
import Paper from "../../components/Paper";
import { useGetNotificationsQuery } from "../../api/endpoints/NotificationsApi";
import NotificationItem from "../../components/NotificationItem";
import cn from "./NotificationsPage.module.scss";
import TabLayout from "../../layouts/TabLayout";
import MainLayout from "../../layouts/MainLayout";
import Undraw from "react-undraw";
import EmptyState from "../../domain/EmptyState";
import Spinner from "../../components/Spinner";

const NotificationsPage = () => {
  const { data, error, isLoading } = useGetNotificationsQuery();

  function SkeletonNotification() {
    return [0, 1, 2].map((id) => (
      <NotificationItem className={classNames(cn.NotificationItem)} isLoadingItem={isLoading} key={id} />
    ));
  }

  function Content() {
    if (isLoading) return <Spinner />;

    if (error) return (
      <EmptyState
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
      <Paper className={classNames(cn.Wrapper)}>
        <div className={classNames(cn.Content)}>
          <NotificationItem className={classNames(cn.NotificationItem)} {...item} />
        </div>
      </Paper>
    ));
  }

  return (
    <MainLayout title="История уведомлений">
      <TabLayout>
        <Content />
      </TabLayout>
    </MainLayout>
  );
};

export default NotificationsPage;
