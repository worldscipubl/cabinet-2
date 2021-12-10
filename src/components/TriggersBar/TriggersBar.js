import React, { useState } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cn from "./TriggersBar.module.scss";
import { useGetTriggersQuery } from "../../api/endpoints/NotificationsApi";

const tabs = [
  {
    "id": 0,
    "title": "title 1",
    "status": true
  },
  {
    "id": 1,
    "title": "title 2",
    "status": false
  },
  {
    "id": 2,
    "title": "title 3",
    "status": false
  }
];

const TriggersBar = ({ className }) => {
  const { data, error, isLoading } = useGetTriggersQuery();
  const [activeTab, setActiveTab] = useState(0);

  function handleTab(id) {
    setActiveTab(id);
  }

  function SkeletonTabs() {
    return [0, 1, 2].map((id) => (
      <button className={classNames(cn.Item)} key={id}>
        <Skeleton className={classNames(cn.Skeleton)} />
      </button>
    ));
  }

  return (
    <div className={classNames(cn.Wrapper, className)}>
      {data ? data.map(({ id, title }) => (
          <button className={classNames(cn.Item, { [cn.active]: (id === activeTab) })} key={id}
                  onClick={() => handleTab(id)}>
            {title}
          </button>
        )) :
        <SkeletonTabs />
      }
    </div>
  );
};

export default TriggersBar;
