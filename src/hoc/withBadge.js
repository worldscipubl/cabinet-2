import React, { useState } from "react";
import Badge from "../components/Badge";

const withBadge = (Component, badgeProps) => {
  let badgeId = null;

  function setBadgeId(id) {
    badgeId = id;
  }

  function useBadgeId() {
    return [];
  }

  return ({ ...props }) => {
    const [badgeId, setBadgeId] = useState();

    return badgeProps?.injecting ? (
      <Component {...props} badge={<Badge {...badgeProps} injecting />} />
    ) : (
      <Badge {...badgeProps}>
        <Component {...props} useBadgeId={useBadgeId} />
      </Badge>
    );
  };
};

export default withBadge;
