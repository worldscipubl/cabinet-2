import axios from "axios";
import HTTPError from "../services/HTTPError";

export const axiosBaseQuery = (
  { baseUrl, auth } = { baseUrl: "", auth: {} }
) => {
  const hasLogging = true;
  const wspAxios = axios.create({
    baseUrl,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
    auth
  });

  const logMessage = (msg, data) => {
    if (!hasLogging) return;
    console.groupCollapsed(`${msg}`);
    console.table(data?.data);
    console.log(data);
    console.groupEnd();
  };

  return async ({ url, method, data, params, auth }) => {
    try {
      const response = await wspAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        auth
      });
      logMessage("Response API", response);
      return { data: response };
    } catch (error) {
      const handledError = new HTTPError(error);
      logMessage("Response Error", handledError);
      return { error: handledError?.message };
    }
  };
};
