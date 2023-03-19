import axiosConfiguration from "./axiosConfiguration";

const axios = axiosConfiguration("/");

export const AlertsApi = {
  getNumberOfAlerts: () => axios.get("/Alerts/NumberOfAlerts"),
  getAlerts: (limit, currentPage) =>
    axios.get(`Alerts?limit=${limit}&offset=${currentPage}`),
  getAlertDetails: (id) => axios.get(`Alerts/AlertDetails?id=${id}`),
};

export const CasesApi = {
  getNumberOfCases: () => axios.get("Cases/NumberOfCases"),
  getCases: (limit, currentPage) =>
    axios.get(`Cases?limit=${limit}&${currentPage}`),
  getCaseDetails: (id) => axios.get(`Cases/CaseDetails?id=${id}`),
  postComment: (comment) => axios.post(`Cases/PostComment`, comment),
  create: (data) => axios.post(`Cases`, data),
  changeStatus: (data) => axios.put(`Cases/ChangeStatus`, data),
  delete: (id) => axios.delete(`Cases?id=${id}`),
};

export const UsersApi = {
  getUsers: (limit, currentPage) =>
    axios.get(`Users?limit=${limit}&${currentPage}`),
  getUserById: (id) => axios.get(`Users/${id}`),
  updateUser: (id, formData) => axios.put(`Users?id=${id}`, formData),
  createUser: (formData) => axios.post(`Users`, formData),
  deleteUser: (id) => axios.delete(`Users?id=${id}`),
  Login: (formData) => axios.post(`Users/Login`, formData),
};

export const DashboardApi = {
  getTopAlerts: () => axios.get("Dashboard/TopAlerts"),
  getAlertsBySeverity: () => axios.get("Dashboard/AlertsBySeverity"),
  getNumberOfAttackedAssets: () =>
    axios.get("Dashboard/GetNumberOfAttackedAssets"),
  getAttackedAssets: () => axios.get("Dashboard/GetAttackedAssets"),
};

export const TicketsApi = {
  getAll: (limit, currentPage) =>
    axios.get(`Tickets?limit=${limit}&offset=${currentPage}`),
  post: (data) => axios.post("Tickets", data),
  delete: (id) => axios.delete(`Tickets/${id}`),
  update: (id, data) => axios.put(`Tickets/${id}`, data),
  updateStatus: (id, status) => axios.put(`Tickets/${id}/${status}`),
};

export const DashboardSettingsApi = {
  get: (type) => axios.get(`/DashboardSettings?type=${type}`),
  update: (data) => axios.post(`DashboardSettings`, data),
};

export const actionsApi = {
  get: (limit, currentPage, id) =>
    axios.get(`UsersActions?limit=${limit}&offset=${currentPage}&id=${id}`),
};

export const rolesApi = {
  get: (limit, currentPage) =>
    axios.get(`roles?limit=${limit}&offset=${currentPage}`),
  post: async (newRole) => {
    axios.post(`roles`, newRole);
  },
};
