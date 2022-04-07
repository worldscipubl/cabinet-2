import entryApi, { providesList } from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";
import { createEntityAdapter } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.articleMessageId,
  sortComparer: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
});

const ChatApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getMessagesByArticle: build.mutation({
      query: ({ articleId, page = 1 }) => ({
        url: `/message-articles/${articleId}?page=${page}`,
        method: "get",
      }),

      providesTags: ({ partMessages }) => {
        return providesList({
          data: partMessages,
          keyID: "articleMessageId",
          tagType: "messagesByArticle",
        });
      },

      transformResponse: (response, meta, arg) => {
        if (response.data) {
          //текущая страница (начиная с 1)
          const currentPage =
            +response?.headers["x-pagination-current-page"] || 1;
          //количество страниц
          const pageCount = +response?.headers["x-pagination-page-count"] || 0;
          //общее количество ресурсов
          const totalCount =
            +response?.headers["x-pagination-total-count"] || 0;

          const hasMore = currentPage !== pageCount;

          const res = response.data.messages;

          return {
            messages: Object.values(res),
            currentPage,
            hasMore,
          };
        } else retry.fail(new Error("No data"));
      },
      async onCacheEntryAdded(
        { articleId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        // const auth = { email: "rayec89552@aline9.com", password: "DzeG3Jx@}G$p" };
        const authToken = localStorage.getItem("user_token");
        return
        const ws = new WebSocket(
          `wss://api.worldscipubl.com:8001?basic=${authToken}&articleId=${articleId}`
        );
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            console.log(event);
            const data = JSON.parse(event.data);
            console.log(data);
            if (!data) return;
            // if (!isMessage(data) || data.channel !== arg) return;

            // updateCachedData((draft) => {
            //   console.log(draft);
            //   // messagesAdapter.upsertOne(draft, data)
            // });
          };

          ws.addEventListener("message", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
    sendMessagesByArticle: build.mutation({
      query: (data) => ({
        url: "/message-articles",
        method: "post",
        data: data,
      }),
      // invalidatesTags: ["messagesByArticle"]
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMessagesByArticlePrefetch,
  useGetMessagesByArticleQuery,
  useLazyGetMessagesByArticleQuery,
  useGetMessagesByArticleMutation,
  useSendMessagesByArticleMutation,
} = ChatApi;
