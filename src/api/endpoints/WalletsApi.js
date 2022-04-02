import entryApi, { providesList } from "../entryApi";

const WalletsApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить список кошельков */
    getWallets: build.query({
      query: () => ({ url: "/wallets", method: "get" }),
      providesTags: (result) =>
        providesList({
          data: result,
          tagType: "paymentCard",
        }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    /* Добавить кошелек */
    addWallet: build.mutation({
      query: (wallet) => ({ url: "/wallets", method: "post", data: wallet }),
      invalidatesTags: [{ type: "paymentCard", id: "LIST" }],
    }),

    /* Удалить кошелек */
    deleteWallet: build.mutation({
      query: (id) => ({ url: "/wallets", method: "delete", data: { id } }),
      invalidatesTags: [{ type: "paymentCard", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWalletsQuery,
  useAddWalletMutation,
  useDeleteWalletMutation,
} = WalletsApi;
