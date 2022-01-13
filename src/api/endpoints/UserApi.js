import entryApi, {providesObject} from "../entryApi";

const UserApi = entryApi.injectEndpoints({
    endpoints: (build) => ({
        /**
         * Проверить пользователя на существование
         * method: GET
         * url: /users/exist
         * param: email*
         */
        checkExistUser: build.query({
            query: (email) => ({url: `/users/exist?email=${email}`, method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),
        /**
         * Авторизация
         * method: POST
         * url: /users/login
         */
        loginUser: build.mutation({
            query: (userToken) => ({
                url: "/users/login",
                method: "post",
                headers: {"Authorization": `Basic ${userToken}`}
            }),
            transformResponse: (response) => {
                return response.data;
            },
            invalidatesTags: ["user"]
        }),

        getUser: build.query({
            query: () => ({
                url: "/users/login",
                method: "post"
            }),
            providesTags: (result) => providesObject({
                data: result,
                tagType: "user"
            }),
            transformResponse: (response) => {
                return response.data;
            }
        }),
        /**
         * Регистрация пользователя
         * method: POST
         * url: /users/registration
         */
        registrationUser: build.mutation({
            query: ({user}) => ({
                url: "/users/registration",
                method: "post",
                data: user
            }),
            invalidatesTags: ["user"]
        }),
        /**
         * Восстановления пароля
         * method: POST
         * url: /users/reset
         * param: email*
         */
        resetUserPassword: build.mutation({
            query: ({email}) => ({
                url: `/users/reset?email=${email}`,
                method: "post"
            }),
            invalidatesTags: ["user"]
        }),
        /**
         * Переход по ссылке воставноления пароля
         * method: GET
         * url: /users/reset/{resetToken}
         * param: resetToken*
         */
        resetUserToken: build.query({
            query: (resetToken) => ({url: `/users/reset?resetToken=${resetToken}`, method: "get"}),
            transformResponse: (response) => {
                return response.data;
            }
        }),
        /**
         * Получить информацию об авторизованном пользователе
         * method: GET
         * url: /users/self
         */
        getUserData: build.query({
            query: () => ({url: "/users/self", method: "get"}),
            providesTags: (result) => result ?
                [{...result, ...{type: "userData"}}, "userData"] :
                ["userData"],
            transformResponse: (response) => {
                return response.data;
            }
        }),
        /**
         * Редактирование полей авторизованного пользователя
         * method: PUT
         * url: /users/self
         */
        setUserData: build.mutation({
            query: ({data, isFile = false}) => ({
                url: isFile ? "/user-files" : "/users/self",
                method: isFile ? "post" : "put",
                data
            }),
            invalidatesTags: ["userData"]
        }),
        /**
         * Изменение пароля пользователя
         * method: PUT
         * url: /users/password
         */
        setUserPassword: build.mutation({
            query: (data) => ({
                url: "/users/password",
                method: "put",
                data
            })
        }),
        /**
         * Изменение аватарки пользователя
         * method: PUT
         * url: /users/avatar
         */
        setUserAvatar: build.mutation({
            query: (data) => ({
                url: "/users/avatar",
                method: "put",
                data
            }),
            invalidatesTags: ["user"]
        })
    }),
    overrideExisting: false
});

export const {
    useGetUserQuery,
    useGetUserDataQuery,
    useSetUserDataMutation,
    useSetUserPasswordMutation,
    useSetUserAvatarMutation,
    useLoginUserMutation
} = UserApi;
