import React from "react";
import { useParams } from "react-router-dom";
import TabLayout from "../../layouts/TabLayout";
import AdTab from "./tabs/AdTab";
import AmountTab from "./tabs/AmountTab";
import LinkTab from "./tabs/LinkTab";
import PayoutTab from "./tabs/PayoutTab";
import withMainLayout from "../../hoc/withMainLayout";
import "./ReferralPage.module.scss";

const ReferralPage = ({user}) => {
  sessionStorage.setItem("page", "true")
  const { tabId } = useParams();

  const ReferralTabs = [
    <LinkTab tabId="link" tabLabel="Реферальная ссылка" key="link-tab" user={user.user} />,
    <AmountTab tabId="amount" key="amount-tab" tabLabel="Счет" user={user.user}/>,
    <PayoutTab tabId="payout" tabLabel="Выплаты" key="payout-tab" user={user.user}/>,
  ];

  return <TabLayout defaultTabs={tabId}>{ReferralTabs}</TabLayout>;
};

export default withMainLayout(ReferralPage, { title: "Партнерская программа" });
