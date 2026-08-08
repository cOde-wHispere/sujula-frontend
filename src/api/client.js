import axios from "axios";

let getRequestContext = () => null;

export function bindRequestContext(getter) {
  getRequestContext = getter;
}

export const apiClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const context = getRequestContext();

    config.headers = config.headers || {};

    if (context) {
      if (context.currency) {
        config.headers["X-Currency"] =
          context.currency;
      }

      if (
        context.deliveryLatitude !== null &&
        context.deliveryLatitude !== undefined
      ) {
        config.headers["X-Latitude"] = String(
          context.deliveryLatitude
        );
      }

      if (
        context.deliveryLongitude !== null &&
        context.deliveryLongitude !== undefined
      ) {
        config.headers["X-Longitude"] = String(
          context.deliveryLongitude
        );
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);