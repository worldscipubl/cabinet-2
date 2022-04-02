import entryApi from "../entryApi";

const ArticleFilesApi = entryApi.injectEndpoints({
  endpoints: (build) => ({
    /* Получить данные о файлах статьи */
    getFilesByArticleId: build.query({
      query: (articleId) => ({
        url: `/article-files/article/${articleId}`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    /* Просмотр файла */
    getFileById: build.query({
      query: (fileId) => ({ url: `/article-files/${fileId}`, method: "get" }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    /* Скачивание файла */
    downloadFileById: build.query({
      query: (fileId) => ({
        url: `/article-files/download/${fileId}`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    /* Загрузить файл статьи */
    uploadFile: build.mutation({
      query: (data) => ({ url: "/article-files", method: "post", data }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFilesByArticleIdQuery,
  useGetFileByIdQuery,
  useDownloadFileByIdQuery,
  useLazyDownloadFileByIdQuery,
  useLazyGetFileByIdQuery,
  useUploadFileMutation,
} = ArticleFilesApi;
