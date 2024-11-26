import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiCall = {
  fetchEmployees: async (query = "") => {
    const response = await api.get(`/search?q=${query}`);
    return response.data;
  },

  addEmployee: async (employee) => {
    const response = await api.post("/employees", employee);
    return response.data;
  },

  updateEmployee: async (id, employee) => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees?id=${id}`);
    return response.data;
  },
};
