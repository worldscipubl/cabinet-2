import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import DashboardCard from "./DashboardCard";
import cn from "./ReferralDashboard.module.scss";

const ReferralDashboard = ({ className, data, isLoading, metrics }) => {
  return (
    <div className={className}>
      <div className={classNames(cn.Grid)}>
        {metrics.map(({ label, field }, index) => (
          <DashboardCard
            className={classNames(cn.Item)}
            key={`${data?.[label]}_${index}`}
            value={data?.[field] || ""}
            label={label || ""}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

ReferralDashboard.propTypes = {
  metrics: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default ReferralDashboard;
