import entryApi from "../entryApi";

const BeforeArticleApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить заявки текущего пользователя */
    getApplications: build.query({
      query: () => ({ url: "/before-article", method: "get" }),
      providesTags: (result) =>
        result
          ? [{ ...result, ...{ type: "beforeArticle" } }, "beforeArticle"]
          : ["beforeArticle"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    /* Подтвердить заявку */
    confirmApplication: build.mutation({
      query: (token) => ({
        url: `/before-article/confirm/${token}`,
        method: "get",
      }),
      invalidatesTags: ["beforeArticle"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    /* Отменить заявку */
    cancelApplication: build.mutation({
      query: (token) => ({
        url: `/before-article/cancel/${token}`,
        method: "get",
      }),
      invalidatesTags: ["beforeArticle"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    /* Скачать заявку */
    downloadApplication: build.query({
      query: (token) => ({
        url: `/before-article/download/${token}`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useCancelApplicationMutation,
  useConfirmApplicationMutation,
} = BeforeArticleApi;
