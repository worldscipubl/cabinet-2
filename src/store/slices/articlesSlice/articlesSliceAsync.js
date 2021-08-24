import { createAsyncThunk } from "@reduxjs/toolkit";
import ArticlesService from "../../../services/ArticlesService";

const articlesService = new ArticlesService();

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (args, { rejectWithValue }) => {
    try {
      return await articlesService.getArticles();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchArticlesReducers = {
  [fetchArticles.pending]: (state) => {
    state.articles = [];
    state.loading = true;
    state.error = null;
  },
  [fetchArticles.fulfilled]: (state, action) => {
    state.articles = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchArticles.rejected]: (state, action) => {
    state.articles = [];
    state.loading = false;
    state.error = action.payload;
  },
};

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (articleId, { rejectWithValue }) => {
    try {
      console.log("fetchArticleById");
      const data = await articlesService.getArticleById(articleId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchArticleByIdReducers = {
  [fetchArticleById.pending]: (state) => {
    state.article = [];
    state.loading = true;
    state.error = null;
  },
  [fetchArticleById.fulfilled]: (state, action) => {
    state.article = action.payload;
    state.statuses = {
      [action.payload.currentStage]: action.payload.currentStatus,
    };
    state.loading = false;
    state.error = null;
  },
  [fetchArticleById.rejected]: (state, action) => {
    state.article = [];
    state.loading = false;
    state.error = action.payload;
  },
};

export const fetchArticleChanges = createAsyncThunk(
  "articles/fetchArticleChanges",
  async ({ articleId, stage, start }, { rejectWithValue }) => {
    try {
      const data = await articlesService.getArticleChanges(
        articleId,
        stage,
        start
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchArticleChangesReducers = {
  [fetchArticleChanges.pending]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [fetchArticleChanges.fulfilled]: (state, action) => {
    state.statuses[state.article.currentStage].push(...action.payload);
    state.loading = false;
    state.error = null;
  },
  [fetchArticleChanges.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
};
