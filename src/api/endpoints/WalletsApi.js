import entryApi from "../entryApi";

const WalletsApi = entryApi.injectEndpoints({
    endpoints: (build) => ({
        /* Получить список кошельков */
        getWallets: build.query({
            query: () => ({url: "/wallets", method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),

        /* Добавить кошелек */
        addWallet: build.mutation({
            query: (wallet) => ({url: "/wallets", method: "post", data: wallet})
        }),

        /* Удалить кошелек */
        deleteWallet: build.mutation({
            query: (wallet) => ({url: "/wallets", method: "delete", data: wallet})
        })
    }),
    overrideExisting: false
});

export const {
    useGetWalletsQuery,
    useAddWalletMutation,
    useDeleteWalletMutation,
} = WalletsApi;
