import React from "react";
import classNames from "classnames";
import DashboardCard from "./DashboardCard";
import cn from "./ReferralDashboard.module.scss";

const ReferralDashboard = ({ className, data, isLoading }) => {
  const { countRegistration = "", countPay = "", pendingPay = "", pay = "" } = data || {};

  return (
    <div className={className}>
      <div className={classNames(cn.Grid)}>
        <DashboardCard className={classNames(cn.Item)} isLoading={isLoading} value={countRegistration}
                       label="Регистраций" />
        <DashboardCard className={classNames(cn.Item)} isLoading={isLoading} value={countPay} label="Оплат" />
        <DashboardCard className={classNames(cn.Item)} isLoading={isLoading} value={pendingPay}
                       label="Ожидается выплат" />
        <DashboardCard className={classNames(cn.Item)} isLoading={isLoading} value={pay} label="Заработано" />
      </div>
    </div>
  );
};

export default ReferralDashboard;
