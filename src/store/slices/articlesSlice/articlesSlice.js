import { createSlice } from "@reduxjs/toolkit";
import {
  fetchArticleByIdReducers,
  fetchArticleChangesReducers,
  fetchArticlesReducers,
} from "./articlesSliceAsync";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    article: {},
    statuses: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    ...fetchArticlesReducers,
    ...fetchArticleByIdReducers,
    ...fetchArticleChangesReducers,
  },
});

export const { articlesLoading, articlesReceived } = articlesSlice.actions;
export default articlesSlice.reducer;
