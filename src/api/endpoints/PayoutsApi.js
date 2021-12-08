import React from "react";
import entryApi from "../entryApi";

const PayoutsApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getPayouts: build.query({
      query: () => ({ url: "/outputs", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetPayoutsQuery
} = PayoutsApi;
