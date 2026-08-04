import axios from "axios";

let getRequestContext = () => null;

export function bindRequestContext(getter) {
  getRequestContext = getter;
}

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
});


apiClient.interceptors.request.use(
  (config) => {

    const context = getRequestContext();

    config.headers = config.headers || {};

    if (context) {

      if (context.language) {
        config.headers["Accept-Language"] =
          context.language;
      }

      if (context.currency) {
        config.headers["X-Currency"] =
          context.currency;
      }

      if (context.location) {

        config.headers["X-Latitude"] =
          String(context.location.lat);

        config.headers["X-Longitude"] =
          String(context.location.lon);
      }
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);