import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const _API_BASE = "https://api.worldscipubl.com/v1";
const _TEST_USER = {
  username: "rayec89552@aline9.com",
  password: "DzeG3Jx@}G$p"
};

// initialize an empty api service that we'll inject endpoints into later as needed
const entryApi = createApi({
  reducerPath: "wspApi",
  tagTypes: ["briefArticle", "briefContact", "briefAuthors", "articlePayment", "messagesByArticle", "userData"],
  baseQuery: axiosBaseQuery({ baseUrl: _API_BASE, auth: _TEST_USER }),
  endpoints: () => ({})
});

// export const { endpoints: apiEndpoints } = entryApi;
export default entryApi;
