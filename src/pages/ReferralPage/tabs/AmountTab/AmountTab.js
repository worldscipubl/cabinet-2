import React from "react";
import classNames from "classnames";
import ReferralDashboard from "../../../../components/ReferralDashboard";
import cn from "./AmountTab.module.scss";
import { useGetFriendsQuery } from "../../../../api/endpoints/FiendsApi";
import ReferralAmountTable from "./ReferralAmountTable";


const AmountTab = () => {
  const { data, error, isLoading } = useGetFriendsQuery();
  const metrics = [
    { label: "Регистраций", field: "countRegistration" },
    { label: "Оплат", field: "countPay" },
    { label: "Ожидается выплат", field: "pendingPay" },
    { label: "Заработано", field: "pay" }
  ];

  return (
    <div className={classNames(cn.Container)}>
      <ReferralDashboard isLoading={isLoading} data={data?.metrics}
                         metrics={metrics} className={classNames(cn.Dashboard)} />
      <ReferralAmountTable isLoading={isLoading} data={data?.data || []} className={classNames(cn.Table)} />
    </div>
  );
};

export default AmountTab;
