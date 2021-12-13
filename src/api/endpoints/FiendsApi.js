import entryApi from "../entryApi";

const FiendsApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getFriends: build.query({
      query: () => ({ url: "/friends", method: "get" }),
      transformResponse: (response) => {
        return response.data;
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetFriendsQuery
} = FiendsApi;
