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
  getAlertDetails: (id) => axios.get(`Alerts/AlertDetails?id=${id}`),
};

export const CasesApi = {
  getNumberOfCases: () => axios.get("Cases/NumberOfCases"),
  getCases: () => axios.get("Cases"),
  getCaseDetails: (id) => axios.get(`Cases/CaseDetails?id=${id}`),
  postComment: (comment) => axios.post(`Cases/PostComment`, comment),
};

export const UsersApi = {
  getUsers: () => axios.get("Users"),
  updateUser: (id, formData) => axios.put(`Users?id=${id}`, formData),
  createUser: (formData) => axios.post(`Users`, formData),
  deleteUser: (id) => axios.delete(`Users?id=${id}`),
  Login: (formData) =>
    axios.get(
      `Users/Login?username=${formData.username}&password=${formData.password}`
    ),
};
