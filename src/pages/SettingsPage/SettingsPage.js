import React from "react";
import { useParams } from "react-router-dom";
import withMainLayout from "../../hoc/withMainLayout";
import TabLayout from "../../layouts/TabLayout";
import ProfileData from "./ProfileData";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ContractData from "./ContractData";
import ProfileDataTest from "./ProfileData/ProfileDataTest";

const SettingsPage = ({user}) => {

  sessionStorage.setItem("page", "true")
  const { settings, tabId } = useParams();

  const TabsSettings = [
    <ProfileData
      tabLabel="Данные профиля"
      tabId="profile"
      key="profile"
      user={user.user}
    />,

    // <ProfileDataTest
    //   tabLabel="Данные профиля"
    //   tabId="profile"
    //   key="profile"
    //   user={user.user}
    // />,

    <ContractData
      tabLabel="Данные для договора"
      tabId="contract"
      key="contract"
      user={user.user}
    />,
    <ProfileSettings
      tabLabel="Настройки профиля"
      tabId="profile-settings"
      key="profile-settings"
      user={user.user}
    />,
    <NotificationSettings
      tabLabel="Настройки уведомлений"
      tabId="notifications"
      key="notifications"
      user={user.user}
    />,
  ];

  return <TabLayout defaultTabs={tabId}>{TabsSettings}</TabLayout>;
};

export default withMainLayout(SettingsPage, { title: "Настройки" });
