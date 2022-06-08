import axios from "axios";

import { authStore } from "../context/Auth";
import { memoizedRefreshToken } from "../shared/refreshToken";

axios.defaults.baseURL = "http://localhost:3333/api";

axios.interceptors.request.use(
  async (config) => {
    const session = authStore.currentSession;

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session.accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
