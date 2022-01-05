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
  "user",
  "articleCard"
];

export function providesList({ data, key = "id", tagType }) {
  return data
    ? [
      { type: tagType, id: "LIST" },
      ...data.map((item) => ({ type: tagType, id: item[key] }))
    ]
    : [{ type: tagType, id: "LIST" }];
}

const entryApi = createApi({
  reducerPath: "wspApi",
  tagTypes: TAG_TYPES,
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL, auth: TEST_USER }),
  endpoints: () => ({})
});

export default entryApi;
