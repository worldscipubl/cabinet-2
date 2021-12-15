import React from "react";
import { Route, useParams } from "react-router-dom";
import TabLayout from "../../layouts/TabLayout";
import AdTab from "./tabs/AdTab";
import AmountTab from "./tabs/AmountTab";
import LinkTab from "./tabs/LinkTab";
import PayoutTab from "./tabs/PayoutTab";
import "./ReferralPage.scss";
import MainLayout from "../../layouts/MainLayout";


const ReferralPage = (props) => {
  const { tabId } = useParams();

  const ReferralTabs = [
    <LinkTab
      tabId="link"
      tabLabel="Реферальная ссылка"
      key="link-tab" />,
    <AmountTab
      tabId="amount"
      key="amount-tab"
      tabLabel="Счет"
    />,
    <PayoutTab
      tabId="payout"
      tabLabel="Выплаты"
      key="payout-tab" />,
    <AdTab tabId="ad-tab" key="ad-tab" tabLabel="Рекламные материалы" />
  ];

  return (
    <MainLayout title="Программа лояльности">
      <TabLayout defaultTabs={tabId}>
        {ReferralTabs}
      </TabLayout>
    </MainLayout>
  );
};

export default ReferralPage;
