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
  reducers: {
    addArticles: (state, action) => {
      state.articles = action.payload;
    },
  },

  extraReducers: {
    ...fetchArticlesReducers,
    ...fetchArticleByIdReducers,
    ...fetchArticleChangesReducers,
  },
});

export const { addArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
