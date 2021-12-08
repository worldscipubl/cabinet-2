import React from "react";
import entryApi from "../entryApi";

const NotificationsApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    // Получить статус email - вкл/выкл
    getNotifications: build.query({
      query: () => ({ url: "/notifies", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    getNotificationById: build.query({
      query: (id) => ({ url: `/notifies/${id}`, method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetFriendsQuery
} = NotificationsApi;
