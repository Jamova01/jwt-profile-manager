import axios from "axios";
import { getSessionAction } from "./actions";

const api = axios.create({
  baseURL: "http://46.202.88.87:8010/usuarios/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSessionAction();
    if (session) {
      config.headers.Authorization = `Bearer ${session.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
