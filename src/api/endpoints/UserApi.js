import React from "react";
import entryApi from "../entryApi";

const UserApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getUserData: build.query({
      query: () => ({ url: "/users/self", method: "get" }),
      providesTags: (result) => result ?
        [{ ...result, ...{ type: "userData" } }, "userData"] :
        ["userData"],
      transformResponse: (response) => {
        return response.data;
      }
    }),
    setUserData: build.mutation({
      query: ({ data, isFile = false }) => ({
        url: isFile ? "/user-files" : "/users/self",
        method: isFile ? "post" : "put",
        data
      }),
      invalidatesTags: ["userData"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetUserDataQuery,
  useSetUserDataMutation
} = UserApi;
