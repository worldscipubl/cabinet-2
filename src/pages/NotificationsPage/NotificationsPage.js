import React from "react";
import classNames from "classnames";
import Paper from "../../components/Paper";
import { useGetNotificationsQuery } from "../../api/endpoints/NotificationsApi";
import NotificationItem from "../../components/NotificationItem";
import cn from "./NotificationsPage.module.scss";
import TabLayout from "../../layouts/TabLayout";

const NotificationsPage = () => {
  const { data, error, isLoading } = useGetNotificationsQuery();

  function SkeletonNotification() {
    return [0, 1, 2].map((id) => (
      <NotificationItem className={classNames(cn.NotificationItem)} isLoadingItem={isLoading} key={id} />
    ));
  }

  return (
    <TabLayout title="История уведомлений">
      <Paper className={classNames(cn.Wrapper)}>
        <div className={classNames(cn.Content)}>
          {data ?
            data.map((item) => (
              <NotificationItem className={classNames(cn.NotificationItem)} {...item} />
            )) :
            <SkeletonNotification />
          }
        </div>
      </Paper>
    </TabLayout>
  );
};

export default NotificationsPage;
