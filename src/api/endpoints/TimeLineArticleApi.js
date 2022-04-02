import { retry } from "@reduxjs/toolkit/query";
import entryApi from "../entryApi";

const TimeLineArticleApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /*
     * Получить данные о статусах и файлах по этапу и статье (пагинация)
     * (urlNext заполняется только в последнем статусе текущей выборки)
     */
    getArticleChanges: build.query({
      query: ({ articleId, stage, start, count }) => ({
        url: "/article-changes",
        method: "get",
        params: { articleId, stage, start, count },
      }),
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetArticleChangesQuery, useLazyGetArticleChangesQuery } =
  TimeLineArticleApi;
