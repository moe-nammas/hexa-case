import Axios from "axios";

const axiosConfig = {
  baseURL: process.env.BACKEND_URL,
};

const axios = Axios.create(axiosConfig);

export const AlertsApi = {
  test: () => axios.get("/api"),
};
