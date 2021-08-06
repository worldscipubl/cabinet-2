import React from "react";
import { ReactComponent as NotFoundIllustration } from "../../common/images/illustrations/not-found.svg";
import EmptyState from "../EmptyState/EmptyState";

export const NotFoundPage = () => {
  return (
    <EmptyState
      image={<NotFoundIllustration />}
      title="СТРАНИЦА НЕ СУЩЕСТВУЕТ"
      description="Страница, к которой вы пытаетесь получить доступ, не существует."
    />
  );
};
