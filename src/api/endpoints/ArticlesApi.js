import entryApi, { providesList } from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";

const ArticlesApi = entryApi.injectEndpoints({
  endpoints: (build) => ({

    /* Получить все статьи автора */
    getArticles: build.query({
      query: () => ({ url: "/articles", method: "get" }),
      providesTags: (result) => providesList({
        data: result,
        key: "articleId",
        tagType: "articleCard"
      }),
      transformResponse: (response) => {
        return response.data;
      }
    }),

    /* Получение информации по статье */
    getArticleById: build.query({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        method: "get",
        params: { expand: "articleUploaded,currentStage,currentStatus" }
      }),
      providesTags: (result, error, queryArg) =>
        result ?
          [...result.map(({ articleId }) => (
            { type: "briefArticle", id: articleId }
          )), "articleCard"] :
          ["article"],
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    }),

    /* Подать заявку на публикацию */
    applyArticle: build.mutation({
      query: (data) => ({
        url: "/articles",
        method: "post",
        data
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useApplyArticleMutation
} = ArticlesApi;
