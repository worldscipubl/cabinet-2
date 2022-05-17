import React, {useEffect} from "react";
import classNames from "classnames";
import ReferralDashboard from "../../../../components/ReferralDashboard";
import cn from "./AmountTab.module.scss";
import { useGetFriendsQuery } from "../../../../api/endpoints/FiendsApi";
import ReferralAmountTable from "./ReferralAmountTable";
import {useHistory} from "react-router-dom";

const AmountTab = ({tabId, user}) => {
  sessionStorage.setItem("page", "true")

  const { data, error, isLoading } = useGetFriendsQuery();
  const metrics = [
    { label: "Регистраций", field: "countRegistration" },
    { label: "Оплат", field: "countPay" },
    { label: "Ожидается выплат", field: "pendingPay" },
    { label: "Заработано", field: "pay" },
  ];

  const history = useHistory()
  useEffect( () => {
    history.push(`/referral/${tabId}`)
  },[])

  return (
    <div className={classNames(cn.Container)}>
      <ReferralDashboard
        isLoading={isLoading}
        data={data?.metrics}
        metrics={metrics}
        className={classNames(cn.Dashboard)}
      />
      <ReferralAmountTable
        isLoading={isLoading}
        data={data?.data || []}
        className={classNames(cn.Table)}
      />
    </div>
  );
};

export default AmountTab;
