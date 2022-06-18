import axiosConfiguration from "./axiosConfiguration";

const axios = axiosConfiguration("/");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const AlertsApi = {
  getNumberOfAlerts: () => axios.get("/Alerts/NumberOfAlerts"),
  getAlerts: () => axios.get("Alerts"),
};

export const CasesApi = {
  getNumberOfCases: () => axios.get("Cases/NumberOfCases"),
  getCases: () => axios.get("Cases"),
};

export const UsersApi = {
  getUsers: () => axios.get("Users"),
};
