import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// -------------------- EXAM APIs --------------------

export const startExam = (payload) => API.post("/exam/start", payload);

export const updateExam = (payload) => API.post("/exam/update", payload);

export const fetchReport = (userId) =>
  API.get(`/admin/report/${userId}`);

export const fetchDashboard = () =>
  API.get("/admin/dashboard");

export default API;