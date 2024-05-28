import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    //@ts-ignore
    config.headers = {
      ...config.headers,
    };
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  function (error) {
    if (error.response) {
      return Promise.reject({
        error: error?.response,
        status: error.response.status,
        message: error.response.data.message,
      });
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);