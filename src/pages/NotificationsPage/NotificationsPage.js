import React from "react";
import classNames from "classnames";
import Paper from "../../components/Paper";
import { useGetNotificationsQuery } from "../../api/endpoints/NotificationsApi";
import TabLayout from "../../layouts/TabLayout";
import MainLayout from "../../layouts/MainLayout";
import cn from "./NotificationsPage.module.scss";
import ListNotifications from "../../components/ListNotifications";


const NotificationsPage = () => {
  const { data, error, isLoading } = useGetNotificationsQuery();

  return (
    <MainLayout title="История уведомлений">
      <TabLayout>
        <Wrapper data={data}>
          <ListNotifications spinner wrapper={Wrapper} isLoading={isLoading} error={error} data={data} />
        </Wrapper>
      </TabLayout>
    </MainLayout>
  )
    ;
};

function Wrapper({ children, data }) {
  if (data?.length > 0) return (
    <Paper className={classNames(cn.Wrapper)}>
      {children}
    </Paper>
  );

  return children;
}

export default NotificationsPage;
