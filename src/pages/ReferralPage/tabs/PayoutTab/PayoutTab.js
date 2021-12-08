import React from "react";
import { useGetPayoutsQuery } from "../../../../api/endpoints/PayoutsApi";

const PayoutTab = () => {
  const { data, error, isLoading } = useGetPayoutsQuery();
  return (
    <div>
      <pre>
        {data && JSON.stringify(data, null, 1)}
      </pre>
    </div>
  );
};

export default PayoutTab;
