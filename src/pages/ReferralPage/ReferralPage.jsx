import React from "react";
import "./ReferralPage.scss";
import TabLayout from "../../layouts/TabLayout";
import AdTab from "./tabs/AdTab";
import AmountTab from "./tabs/AmountTab";
import LinkTab from "./tabs/LinkTab";
import PayoutTab from "./tabs/PayoutTab/PayoutTab";
import { useParams } from "react-router-dom";


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
    <TabLayout title="Программа лояльности" defaultTabs={tabId}>
      {ReferralTabs}
    </TabLayout>
  );
};

export default ReferralPage;
