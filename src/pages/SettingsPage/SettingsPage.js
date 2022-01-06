import React from "react";
import {useParams} from "react-router-dom";
import withMainLayout from "../../hoc/withMainLayout";
import TabLayout from "../../layouts/TabLayout";
import ProfileData from "./ProfileData";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import ContractData from "./ContractData";


const SettingsPage = () => {
    const {tabId} = useParams();
    const TabsSettings = [
        <ProfileData tabLabel="Данные профиля" tabId="profile" key="profile"/>,
        <ContractData tabLabel="Данные для договора" tabId="contract" key="contract"/>,
        <ProfileSettings tabLabel="Настройки профиля" tabId="profile-settings" key="profile-settings"/>,
        <NotificationSettings tabLabel="Настройки уведомлений" tabId="notifications" key="notifications"/>
    ]


    return (
        <TabLayout defaultTabs={tabId}>
            {TabsSettings}
        </TabLayout>
    )
};

export default withMainLayout(SettingsPage, {title: "Настройки"});
