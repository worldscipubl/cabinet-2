import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice/articlesSlice";

const store = configureStore({
  reducer: { articles: articlesSlice },
});

export default store;
