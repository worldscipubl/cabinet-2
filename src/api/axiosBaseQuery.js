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
    auth,
  });

  const logMessage = (msg, data) => {
    if (!hasLogging) return;
    console.log(`<==== ${msg}  ====>`);
    console.log(data);
    console.log(`</==== ${msg}  ====>`);
  };

  return async ({ url, method, data, params, auth }) => {
    try {
      const response = await wspAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        auth,
      });
      logMessage("Response API", response);
      return { data: response };
    } catch (error) {
      error = new HTTPError(error);
      logMessage("Response Error", error);
      return { error: error?.message };
    }
  };
};
