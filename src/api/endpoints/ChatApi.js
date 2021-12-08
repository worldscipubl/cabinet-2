import entryApi from "../entryApi";
import { retry } from "@reduxjs/toolkit/query";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { getHashFromString } from "../../utils/functions";

const messagesAdapter = createEntityAdapter({
  selectId: (message) => {
    const str = message?.dateCreate + message?.text + message?.role;
    return getHashFromString(str);
  }
});

const ChatApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    getMessagesByArticle: build.query({
      query: ({ articleId, page = 1 }) => ({
        url: `/message-articles?articleId=${articleId}&page=${page}`,
        method: "get"
      }),

      providesTags: (result) => result ?
        [{ ...result, ...{ type: "messagesByArticle" } }, "messagesByArticle"] :
        ["messagesByArticle"],
      transformResponse: (response) => {
        if (response.data) {
          //текущая страница (начиная с 1)
          const currentPage = +response?.headers["x-pagination-current-page"] || 1;
          //количество страниц
          const pageCount = +response?.headers["x-pagination-page-count"] || 0;
          //общее количество ресурсов
          const totalCount = +response?.headers["x-pagination-total-count"] || 0;

          const res = messagesAdapter.addMany(messagesAdapter.getInitialState(), response.data).entities;
          return { data: Object.values(res), currentPage, pageCount };

        } else retry.fail(new Error("No data"));
      },
      async onCacheEntryAdded(
        { articleId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const auth = { email: "rayec89552@aline9.com", password: "DzeG3Jx@}G$p" };
        const authToken = window.btoa(auth.email + ":" + auth.password);
        const ws = new WebSocket(`wss://api.worldscipubl.com:8001?basic=${authToken}&articleId=${articleId}`);
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

            updateCachedData((draft) => {
              console.log(draft);
              // messagesAdapter.upsertOne(draft, data)
            });
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
      }
    }),
    sendMessagesByArticle: build.mutation({
      query: (data) => ({
        url: "/message-articles",
        method: "post",
        data
      })
      // invalidatesTags: ["messagesByArticle"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetMessagesByArticlePrefetch,
  useGetMessagesByArticleQuery,
  useLazyGetMessagesByArticleQuery,
  useSendMessagesByArticleMutation
} = ChatApi;
