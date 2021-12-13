import React from "react";
import classNames from "classnames";
import ReferralDashboard from "../../../../components/ReferralDashboard";
import { useGetPayoutsQuery } from "../../../../api/endpoints/PayoutsApi";
import ReferralPayoutTable from "./ReferralPayoutTable";
import cn from "../AmountTab/AmountTab.module.scss";

const PayoutTab = () => {
  const { data, error, isLoading } = useGetPayoutsQuery();
  const metrics = [
    { label: "Баланс", field: "current" },
    { label: "Выведено", field: "output" }
  ];

  return (
    <div className={classNames(cn.Container)}>
      <ReferralDashboard isLoading={isLoading} data={data?.metrics} metrics={metrics}
                         className={classNames(cn.Dashboard)} />
      <button className={classNames(cn.BtnCashout, "button button_type_main")}>Вывести денежные средства</button>
      <ReferralPayoutTable isLoading={isLoading} data={data?.data || []} className={classNames(cn.Table)} />
    </div>
  );
};

export default PayoutTab;
