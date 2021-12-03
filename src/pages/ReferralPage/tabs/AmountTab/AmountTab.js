import React, { useEffect } from "react";
import classNames from "classnames";
import ReferralTable from "../../../../components/ReferralTable";
import ReferralDashboard from "../../../../components/ReferralDashboard";
import cn from "./AmountTab.module.scss";
import { useGetFriendsQuery } from "../../../../api/endpoints/FiendsApi";


const AmountTab = () => {
  const { data, error, isLoading } = useGetFriendsQuery();

  return (
    <div className={classNames(cn.Container)}>
      <ReferralDashboard isLoading={isLoading} data={data?.metrics} className={classNames(cn.Dashboard)} />
      <ReferralTable isLoading={isLoading} data={data?.data || []} className={classNames(cn.Table)} />
    </div>
  );
};

export default AmountTab;
