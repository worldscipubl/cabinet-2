import entryApi from "../entryApi";

const UserFilesApi = entryApi.injectEndpoints({
    endpoints: (build) => ({
        /* Получить данные о файлах пользователя */
        getUserFiles: build.query({
            query: () => ({url: "/user-files", method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),

        /* Просмотр файла */
        getUserFileById: build.query({
            query: (userFileId) => ({url: `/user-files/${userFileId}`, method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),

        /* Скачивание файла */
        downloadUserFileById: build.query({
            query: (userFileId) => ({url: `/user-files/download/${userFileId}`, method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),

        /* Загрузить файл статьи */
        uploadUserFile: build.mutation({
            query: (data) => ({url: "/user-files", method: "post", data})
        })
    }),
    overrideExisting: false
});

export const {
    useGetUserFilesQuery,
    useGetUserFileByIdQuery,
    useDownloadUserFileByIdQuery,
    useLazyGetUserFileByIdQuery,
    useLazyDownloadUserFileByIdQuery,
    useUploadUserFileMutation,
} = UserFilesApi;
