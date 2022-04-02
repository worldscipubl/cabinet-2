import React from "react";
import classNames from "classnames";
import Paper from "../../components/Paper";
import ListNotifications from "../../components/ListNotifications";
import TabLayout from "../../layouts/TabLayout";
import withMainLayout from "../../hoc/withMainLayout";
import { useGetNotificationsQuery } from "../../api/endpoints/NotificationsApi";
import cn from "./NotificationsPage.module.scss";

const NotificationsPage = () => {
  const { data, error, isLoading } = useGetNotificationsQuery();

  return (
    <TabLayout>
      <Wrapper data={data}>
        <ListNotifications
          spinner
          wrapper={Wrapper}
          isLoading={isLoading}
          error={error}
          data={data}
        />
      </Wrapper>
    </TabLayout>
  );
};

function Wrapper({ children, data }) {
  if (data?.length > 0)
    return <Paper className={classNames(cn.Wrapper)}>{children}</Paper>;

  return children;
}

export default withMainLayout(NotificationsPage, {
  title: "История уведомлений",
});
