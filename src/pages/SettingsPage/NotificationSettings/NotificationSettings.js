import React, { useEffect, useState } from "react";
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";
import Toggle from "../../../components/Toggle";
import EmptyState from "../../../domain/EmptyState";
import {
  useGetTriggersQuery,
  useToggleTriggerMutation,
} from "../../../api/endpoints/NotificationsApi";
import ItemCategory from "./ItemCategory";

const NotificationSettings = () => {
  const { data, error, isLoading } = useGetTriggersQuery();
  const [toggleTrigger, {}] = useToggleTriggerMutation();
  const [isLoadingTrigger, setLoadingTrigger] = useState(null);

  useEffect(() => {
    setLoadingTrigger(null);
  }, [data]);

  function handleToggle(id) {
    setLoadingTrigger(id);
    toggleTrigger(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setLoadingTrigger(null);
      });
  }

  if (isLoading)
    return [1, 2, 3, 4, 5].map((key) => (
      <FormFieldRow
        className="brief-form__title"
        key={key}
        label="Уведомления"
        isLoading={isLoading}
      >
        <Toggle />
      </FormFieldRow>
    ));

  if (error)
    return (
      <EmptyState
        type="warning"
        title="Упс... Произошла ошибка!"
        description={error.message}
      >
        <button
          className="button button_type_main"
          onClick={() => document.location.reload()}
        >
          Обновить страницу
        </button>
      </EmptyState>
    );

  return data?.map(({ categoryId, name, items }) => (
    <ItemCategory key={categoryId} title={name}>
      {items?.map(({ id, name, status }) => (
        <FormFieldRow key={id} label={name}>
          <Toggle
            value={status}
            isLoading={isLoadingTrigger === id}
            setValue={() => handleToggle(id)}
          />
        </FormFieldRow>
      ))}
    </ItemCategory>
  ));
};

const NotificationSettingsWrapper =
  (Component) =>
  ({ ...props }) =>
    (
      <CardHeadband title="Настройки уведомлений">
        <Component {...props} />
      </CardHeadband>
    );
export default NotificationSettingsWrapper(NotificationSettings);
