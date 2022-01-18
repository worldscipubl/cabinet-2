import entryApi from "../entryApi";

const PayoutsApi = entryApi.injectEndpoints({
    endpoints: (build) => ({
        getPayouts: build.query({
            query: () => ({url: "/outputs", method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),
        cashOutMoney: build.mutation({
            query: (data) => ({url: "/outputs", method: "post", data}),
            transformResponse: (response) => {
                return response.data;
            }
        })
    }),
    overrideExisting: false
});

export const {
    useGetPayoutsQuery,
    useCashOutMoneyMutation
} = PayoutsApi;
