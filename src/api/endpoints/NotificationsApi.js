import React from "react";
import entryApi from "../entryApi";

const NotificationsApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить статус email - вкл/выкл */
    getStatusEmail: build.query({
      query: () => ({ url: "/notifies/email", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Включить/выключить подписку на email */
    toggleSubscription: build.query({
      query: () => ({ url: "/notifies/email", method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Получить список всех триггеров (вкл/выкл) */
    getTriggers: build.query({
      query: () => ({ url: "/notifies/trigger", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Включить/выключить триггер */
    toggleTrigger: build.query({
      query: (id) => ({ url: `/notifies/trigger/${id}`, method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Обновление токена для пуш уведомлений */
    updateToken: build.query({
      query: () => ({ url: "/notifies/push", method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Получить уведомление (+прочитать) */
    getNotificationById: build.query({
      query: (id) => ({ url: `/notifies/${id}`, method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Прочитать уведомление */
    checkNotificationById: build.query({
      query: (id) => ({ url: `/notifies/${id}`, method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Получить список уведомлений */
    getNotifications: build.query({
      query: () => ({ url: "/notifies", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Прочитать все уведомление */
    checkAllNotification: build.query({
      query: (id) => ({ url: `/notifies`, method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Получить кол-во непрочитанных уведомлений определенных триггеров */
    getCountNotificationByTrigger: build.query({
      query: (id) => ({ url: "/notifies/from-trigger", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    /* Прочитать все уведомления определенных триггеров */
    checkNotificationsByTrigger: build.query({
      query: (id) => ({ url: "/notifies/from-trigger", method: "put" }),
      transformResponse: (response) => {
        return response.data;
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetNotificationsQuery,
  useGetTriggersQuery,
  useLazyGetNotificationByIdQuery,
  useGetNotificationByIdMutation
} = NotificationsApi;
