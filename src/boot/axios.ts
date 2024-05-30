import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

interface env {
  VITE_ACCESS_TOKEN: string;
  VITE_ENVIRONMENT_ID: string;
  VITE_SPACE_ID: string;
  VITE_BOOK_ID: string;
}

const { VITE_ACCESS_TOKEN, VITE_SPACE_ID, VITE_BOOK_ID, VITE_ENVIRONMENT_ID } =
  import.meta.env as unknown as env;

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${VITE_SPACE_ID}/environments/${VITE_ENVIRONMENT_ID}/entries?access_token=${VITE_ACCESS_TOKEN}&sys.id=${VITE_BOOK_ID}`,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
