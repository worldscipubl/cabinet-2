import entryApi from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";

const ArticlesApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => ({ url: "/articles", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),
    getArticleById: build.query({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        method: "get",
        params: { expand: "currentStage,currentStatus" }
      }),
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    }),
    getArticleChanges: build.query({
      query: ({ articleId, stage, start, count }) => ({
        url: "/article-changes",
        method: "get",
        params: { articleId, stage, start, count }
      }),
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticleChangesQuery,
  useLazyGetArticleChangesQuery
} = ArticlesApi;
