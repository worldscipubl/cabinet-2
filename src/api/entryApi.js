import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { BASE_URL, TEST_USER } from "../utils/constants";

const TAG_TYPES = [
  "briefArticle",
  "beforeArticle",
  "briefContact",
  "briefAuthors",
  "articlePayment",
  "messagesByArticle",
  "userData",
  "user"
];

const entryApi = createApi({
  reducerPath: "wspApi",
  tagTypes: TAG_TYPES,
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL, auth: TEST_USER }),
  endpoints: () => ({})
});

export default entryApi;
