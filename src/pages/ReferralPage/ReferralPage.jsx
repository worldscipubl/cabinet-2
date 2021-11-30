import React from "react";
import "./ReferralPage.scss";
import TabLayout from "../../layouts/TabLayout";
import AdTab from "./tabs/AdTab";
import AmountTab from "./tabs/AmountTab";
import LinkTab from "./tabs/LinkTab";
import PayoutTab from "./tabs/PayoutTab/PayoutTab";


const ReferralPage = (props) => {

  const ReferralTabs = [
    <LinkTab
      tabId="link-tab"
      tabLabel="Реферальная ссылка"
      key="link-tab" />,
    <AmountTab
      tabId="amount-tab"
      key="amount-tab"
      tabLabel="Счет"
    />,
    <PayoutTab
      tabId="payout-tab"
      tabLabel="Выплаты"
      key="payout-tab" />,
    <AdTab tabId="ad-tab" key="ad-tab" tabLabel="Рекламные материалы" />
  ];

  return (
    <TabLayout title="Программа лояльности">
      {ReferralTabs}
    </TabLayout>
  );
};

export default ReferralPage;
