import entryApi, {providesList, providesObject} from "../entryApi";
import {retry} from "@reduxjs/toolkit/query";

const ArticlesApi = entryApi.injectEndpoints({
    endpoints: (build) => ({

        /* Получить все статьи автора */
        getArticles: build.query({
            query: () => ({url: "/articles", method: "get"}),
            providesTags: (result) => providesList({
                data: result,
                keyID: "articleId",
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
                params: {expand: "articleUploaded,currentStage,currentStatus"}
            }),
            providesTags: (result) => providesObject({
                data: result,
                tagType: "article"
            }),
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
        }),

        /* Изменить этап сделки в срм */
        updateStatusArticle: build.mutation({
            query: (data) => ({
                url: "/articles/update-status",
                method: "put",
                data
            })
        })
    }),
    overrideExisting: false
});

export const {
    useGetArticlesQuery,
    useGetArticleByIdQuery,
    useApplyArticleMutation,
    useUpdateStatusArticleMutation
} = ArticlesApi;
