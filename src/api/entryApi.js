import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const BASE_URL = "https://api.worldscipubl.com/v1";
const TAG_TYPES = [
  "briefArticle",
  "briefContact",
  "briefAuthors",
  "articlePayment",
  "messagesByArticle",
  "userData",
  "user"
];
const _TEST_USER = {
  username: "rayec89552@aline9.com",
  password: "DzeG3Jx@}G$p"
};

const entryApi = createApi({
  reducerPath: "wspApi",
  tagTypes: TAG_TYPES,
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL, auth: _TEST_USER }),
  endpoints: () => ({})
});

export default entryApi;
