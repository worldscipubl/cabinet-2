import entryApi from "../entryApi";

const FaqApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить список вопросов/ответов в категориях */
    getFaqList: build.query({
      query: () => ({ url: "/faq", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetFaqListQuery } = FaqApi;
