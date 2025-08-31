import axios from "axios";

const api = axios.create({
  baseURL: "http://46.202.88.87:8010/usuarios/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
