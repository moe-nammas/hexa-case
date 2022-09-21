import axiosConfiguration from "./axiosConfiguration";

const axios = axiosConfiguration("/");

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
  create: (data) => axios.post(`Cases`, data),
  changeStatus: (data) => axios.put(`Cases/ChangeStatus`, data),
  delete: (id) => axios.delete(`Cases?id=${id}`),
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

export const DashboardApi = {
  getTopAlerts: () => axios.get("Dashboard/TopAlerts"),
  getAlertsBySeverity: () => axios.get("Dashboard/AlertsBySeverity"),
  getNumberOfAttackedAssets: () =>
    axios.get("Dashboard/GetNumberOfAttackedAssets"),
  getAttackedAssets: () => axios.get("Dashboard/GetAttackedAssets"),
};

export const TicketsApi = {
  getAll: () => axios.get("Tickets"),
  post: (data) => axios.post("Tickets", data),
  delete: (id) => axios.delete(`Tickets/${id}`),
  update: (id, data) => axios.put(`Tickets/${id}`, data),
  updateStatus: (id, status) => axios.put(`Tickets/${id}/${status}`),
};
