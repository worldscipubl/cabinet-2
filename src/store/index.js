import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice/articlesSlice";
import entryApi from "../api/entryApi";

const store = configureStore({
  reducer: {
    // articles: articlesSlice,
    [entryApi.reducerPath]: entryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entryApi.middleware),
});

export default store;
