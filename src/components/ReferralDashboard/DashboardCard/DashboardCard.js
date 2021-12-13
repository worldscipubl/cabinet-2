import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import Paper from "../../Paper";
import cn from "./DashboardCard.module.scss";
import Card from "../../Card";

const DashboardCard = ({ className, label, value, isLoading }) => {
  return (
    <Card className={classNames(className, cn.Card)}>
      <h3 className={classNames(cn.CardLabel)}>{label}</h3>
      <span className={classNames(cn.CardValue)}>
        {isLoading ? <Skeleton className={classNames(cn.CardValue)} /> : value}
      </span>
    </Card>
  );
};

DashboardCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default DashboardCard;
