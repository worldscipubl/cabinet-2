import { configureStore } from "@reduxjs/toolkit";
import entryApi from "../api/entryApi";

const store = configureStore({
  reducer: {
    // articles: articlesSlice,
    [entryApi.reducerPath]: entryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(entryApi.middleware)
});

export default store;
