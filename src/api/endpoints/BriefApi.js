import entryApi from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";

const BriefApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получение данных по брифу */
    getArticle: build.query({
      query: (articleId) => ({
        url: `/brief/article/${articleId}`,
        method: "get"
      }),
      providesTags: (result) => result ?
        [{ ...result, ...{ type: "briefArticle" } }, "briefArticle"] :
        ["briefArticle"],
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    }),
    getContact: build.query({
      query: () => ({
        url: "/brief/contact",
        method: "get"
      }),
      providesTags: (result) => result ?
        [{ ...result, ...{ type: "briefContact" } }, "briefContact"] :
        ["briefContact"],
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    }),
    getAuthors: build.query({
      query: (articleId) => ({
        url: `/reg-forms/${articleId}`,
        method: "get"
      }),
      providesTags: (result) => result ?
        [{ ...result, ...{ type: "briefAuthors" } }, "briefAuthors"] :
        ["briefAuthors"],
      transformResponse: (response) => {
        if (response.data) {
          const { authorInfo, ...regInfo } = response.data;
          return { authorInfo, regInfo };
        } else retry.fail(new Error("No data"));
      }
    }),

    /* Отправка данных по брифу */
    addArticle: build.mutation({
      query: ({ data }) => ({
        url: "/brief/article",
        method: "post",
        data
      }),
      invalidatesTags: ["briefArticle"]
    }),
    addContact: build.mutation({
      query: ({ data, isFile = false }) => ({
        url: isFile ? "/user-files/add" : "/brief/contact",
        method: "post",
        data
      }),
      invalidatesTags: ["briefContact"]
    }),
    addAuthors: build.mutation({
      query: (data) => ({
        url: "/reg-forms/add",
        method: "post",
        data
      }),
      invalidatesTags: ["briefAuthors"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetArticleQuery,
  useGetContactQuery,
  useGetAuthorsQuery,
  useAddArticleMutation,
  useAddContactMutation,
  useAddAuthorsMutation,
  useLazyGetArticleQuery
} = BriefApi;
