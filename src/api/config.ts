import Axios from "axios";
import { getAccessToken, getRefreshToken, removeToken } from "./token";

export const BaseUrl = "https://murphy-back.darkube.app/api/";
export const imageUrl = "https://murphy-back.darkube.app";
export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config) => {
    const token = getAccessToken() || getRefreshToken();

    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,

  (error) => {
    if (error.response.status === 401) {
      removeToken();
    }

    return Promise.reject(error);
  }
);
