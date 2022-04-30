import axios from "axios";
import HTTPError from "./HTTPError";
import { downloadBlobFile } from "../utils/functions";

class ApiService {
  constructor() {
    this._API_BASE = "https://api.worldscipubl.com/v1";
    this.hasLogging = true;
    const token = localStorage.getItem("user_token");
    this.wspAxios = axios.create({
      baseURL: this._API_BASE,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      // headers: { "Content-Type": "multipart/form-data"},
      withCredentials: false,
      // auth: { username: "rayec89552@aline9.com", password: "DzeG3Jx@}G$p" },
    });
  }

  async getResource({
    url = null,
    params = null,
    auth = null,
    responseType = null,
  }) {
    const config = {};
    params && (config.params = params);
    auth && (config.auth = auth);
    responseType && (config.responseType = responseType);

    try {
      const response = await this.wspAxios.get(url, config);
      this.logMessage("Response API", response);
      return response;
    } catch (error) {
      const handledError = new HTTPError(error);
      this.logMessage("Response Error", handledError);
      throw handledError;
    }
  }

  async downloadResource(url) {
    return new Promise((resolve, reject) => {
      this.getResource({
        responseType: "blob",
        url,
      })
        .then((response) => {
          const blob = response?.data;
          console.log(response?.data)
          if (!blob) reject(new Error("File not found!"));
          return blob;
        })
        .then((blob) => {
          downloadBlobFile(blob);
          resolve(blob);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  async setResource({ url = null, data = null, params = null, auth = null }) {
    const config = {};
    params && (config.params = params);
    auth && (config.auth = auth);

    try {
      const response = await this.wspAxios.post(url, data, config);
      this.logMessage("Response API", response);
      return response;
    } catch (error) {
      const handledError = new HTTPError(error);
      this.logMessage("Response Error", handledError);
      throw handledError;
    }
  }

  logMessage(msg, data) {
    if (!this.hasLogging) return;
    console.groupCollapsed(`${msg}`);
    console.table(data?.data);
    console.log(data);
    console.groupEnd();
  }
}

export default ApiService;
