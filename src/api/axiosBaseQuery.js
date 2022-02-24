import axios from "axios";
import HTTPError from "../services/HTTPError";

export const axiosBaseQuery = (
  { baseUrl, auth, prepareHeaders } = { baseUrl: "", auth: {} }) => {
  const hasLogging = true;

  const wspAxios = axios.create({
    baseUrl,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
    auth
  });

  const checkTokenInterceptor = (config) => {
    const token = localStorage.getItem("user_token");
    console.log(token);
    if (token) config.headers.Authorization = `Basic ${token}`;
    return config;
  };

  const logMessage = (msg, data) => {
    if (!hasLogging) return;
    console.groupCollapsed(`${msg}`);
    console.table(data?.data);
    console.log(data);
    console.groupEnd();
  };

  const logMessageSend = (msg, data) => {
    if (!hasLogging) return;
    console.groupCollapsed(`${msg}`);
    console.table(data);
    console.groupEnd();
  };

  wspAxios.interceptors.request.use(checkTokenInterceptor);

  return async ({ url, method, data, params, auth, headers }) => {
    if (method === "post")
      logMessageSend("Request API", data);
    try {
      const response = await wspAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        auth,
        headers
      });
      logMessage("Response API", response);
      console.log(response);
      return { data: response };
    } catch (error) {
      const handledError = new HTTPError(error);
      logMessage("Response Error", handledError);
      if (handledError.handleError(error).status === 401) {
        return { data: { status: 401 } };
      }
      return { error: handledError?.message };
    }
  };
};
