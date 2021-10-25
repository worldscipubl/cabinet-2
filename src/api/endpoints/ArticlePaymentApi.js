import entryApi from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";

const ArticlePaymentApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getPayments: build.query({
      query: (articleId) => ({
        url: `/payments/${articleId}`,
        method: "get"
      }),
      providesTags: (result) => result ?
        [{ ...result, ...{ type: "articlePayment" } }, "articlePayment"] :
        ["articlePayment"],
      transformResponse: (response) => {
        if (response.data) return response.data;
        else retry.fail(new Error("No data"));
      }
    }),

    paymentByLink: build.mutation({
      query: (data) => ({
        url: "/payments/url",
        method: "post",
        data
      }),
      invalidatesTags: ["articlePayment"]
    }),

    paymentByPdf: build.mutation({
      query: (data) => ({
        url: "/payments/pdf",
        method: "post",
        data
      })
    }),

    alreadyPay: build.mutation({
      query: (data) => ({
        url: "/payments/already-pay",
        method: "post",
        data
      }),
      invalidatesTags: ["articlePayment"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetPaymentsQuery,
  usePaymentByLinkMutation,
  usePaymentByPdfMutation,
  useAlreadyPayMutation
} = ArticlePaymentApi;
