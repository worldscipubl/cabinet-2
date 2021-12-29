import entryApi from "../entryApi";

const I18nApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить текущую валюту пользователя */
    getCurrentCurrency: build.query({
      query: () => ({ url: "/currencies", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),

    /* Получить текущий язык пользователя */
    getCurrentLang: build.query({
      query: () => ({ url: "/langs", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),

    /* Определение валюты по GEO IP */
    getCurrencyByGeoIp: build.query({
      query: () => ({ url: "/currencies/detect", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),

    /* Определение языка по GEO IP */
    getLangByGeoIp: build.query({
      query: () => ({ url: "/langs/detect", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    }),

    /* Установить валюту пользователя */
    setCurrency: build.mutation({
      query: (currency) => ({ url: `/currencies/${currency}`, method: "put" })
    }),

    /* Установить валюту пользователя */
    setLang: build.mutation({
      query: (lang) => ({ url: `/langs/${lang}`, method: "put" })
    })
  }),
  overrideExisting: false
});

export const {
  useGetCurrentCurrencyQuery,
  useGetCurrentLangQuery
} = I18nApi;
