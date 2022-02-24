import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "./axiosBaseQuery";
import {BASE_URL} from "../utils/constants";

const TAG_TYPES = [
    "briefArticle",
    "beforeArticle",
    "briefContact",
    "briefAuthors",
    "articlePayment",
    "messagesByArticle",
    "userData",
    "user",
    "articleCard",
    "article",
    "trigger",
    "paymentCard",
    "categoryTrigger",
];

export function providesList({data, keyID = "id", tagType}) {
    return data
        ? [
            {type: tagType, id: "LIST"},
            ...data.map((item) => ({type: tagType, id: item[keyID]}))
        ]
        : [{type: tagType, id: "LIST"}];
}

export function providesObject({data, tagType}) {
    return [{...data, type: tagType}];
}

const entryApi = createApi({
    reducerPath: "wspApi",
    tagTypes: TAG_TYPES,
    baseQuery: axiosBaseQuery({baseUrl: BASE_URL}),
    endpoints: () => ({})
});

export default entryApi;
