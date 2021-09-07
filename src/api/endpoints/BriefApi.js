import entryApi from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";

const BriefApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getContact: build.query({
      query: () => ({
        url: "/brief/contact",
        method: "get",
      }),
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      },
    }),
    getArticle: build.query({
      query: (articleId) => ({
        url: `/brief/article/${articleId}`,
        method: "get",
      }),
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      },
    }),
    getAuthors: build.query({
      query: (articleId) => ({
        url: `/reg-forms/${articleId}`,
        method: "get",
      }),
      transformResponse: (response) => {
        if (response.data) return response.data?.authorInfo;
        else retry.fail(new Error("No data"));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetArticleQuery, useGetContactQuery, useGetAuthorsQuery } =
  BriefApi;
